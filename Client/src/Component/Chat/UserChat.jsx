import { useContext } from "react";
import { useFetchRecipientUser } from "../../Hooks/UserFetchRecipient";
import { UnreadNotificationsFunc } from "../../utils/UnreadNotifications";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import maleAvater from "../../assets/MalePic.svg";
import femaleAvater from "../../assets/FemalePic.svg";
import { ChatContext } from "../../Context/ChatContext";
import { useFetchLatestMessage } from "../../Hooks/useFetchLastestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notification, markThisUserNotificationsAsRead } =
    useContext(ChatContext);
  const { latestMessage } = useFetchLatestMessage(chat);

  console.log("asdnakjsbdjk", notification);

  const unreadNotifications = UnreadNotificationsFunc(notification);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderID == recipientUser._id
  );
  console.log("thisUserNotifications", thisUserNotifications);
  const isOnline = onlineUsers?.some(
    (user) => user?.userID === recipientUser?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notification);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={maleAvater} height="35px" alt="" />
          {/* <img src={gender == "F" ? femaleAvater : maleAvater} alt="" /> */}
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">
            {latestMessage?.text && (
              <span className="notification-text">
                {truncateText(latestMessage?.text)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div
          className={
            thisUserNotifications?.length > 0 ? "this-user-notifications" : ""
          }
        >
          {thisUserNotifications?.length > 0
            ? thisUserNotifications.length
            : ""}
        </div>
        <div className={isOnline ? "user-online" : ""}></div>
      </div>
    </Stack>
  );
};

export default UserChat;
