import { useContext, useState } from "react";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import { UnreadNotificationsFunc } from "../../utils/UnreadNotifications";
import moment from "moment";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    notification,
    userChats,
    allUsers,
    markAllNotificationsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);
  console.log("notificationsQQQQQQQ", notification);
  console.log("allUsers", allUsers);

  const isHideText = true;

  const unreadNotifications = UnreadNotificationsFunc(notification);
  const modifiedNotifications = notification?.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderID);
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  console.log("modifiedNotifications", modifiedNotifications);

  return (
    <>
      <div className="notifications">
        <div className="notification-icon" onClick={() => setIsOpen(!isOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-chat-right-dots-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
          </svg>
          {unreadNotifications?.length === 0 ? null : (
            <span className="notification-count">
              <span>{unreadNotifications?.length}</span>
            </span>
          )}
        </div>
        {isOpen && (
          <div className="notifications-box">
            <div className="notifications-header">
              <h3>Notifications</h3>
              <div
                className="mark-as-read"
                onClick={() => markAllNotificationsRead(notification)}
              >
                Mark all as read
              </div>
            </div>
            {modifiedNotifications?.length === 0 ? (
              <span className="notification-text">No notification yet...</span>
            ) : null}
            {modifiedNotifications &&
              modifiedNotifications?.map((n, index) => {
                return (
                  <div
                    key={index}
                    className={
                      n.isRead ? "notification" : "notification not-read"
                    }
                    onClick={() => {
                      markNotificationAsRead(n, userChats, user, notification);
                      setIsOpen(false)
                    }}
                  >
                    <span>{`${n.senderName} sent you a new message`}</span>
                    {isHideText && (
                      <span className="notification-text">{`${n.message.text}`}</span>
                    )}
                    <span className="notification-time">{`${moment(
                      n.date
                    ).calendar()}`}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
