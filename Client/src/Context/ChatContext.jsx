import {
  Children,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { baseUrl, getRequest, postRequest } from "../utils/Services";
import io from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [ismessagesLoading, setIsmessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState([]);
  const [socket, setSocket] = useState([null]);
  const [onlineUsers, setOnlineUsers] = useState([null]);
  const [notification, setNotification] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  console.log("notid", notification);

  // initail socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:3000"); // Port should be different from server and client port
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // to clean up
    };
  }, [user]);

  // add online users
  useEffect(() => {
    if (!socket || typeof socket.emit !== "function") {
      console.error("Socket is not properly initialized or connected.");
      return;
    }
    socket.emit("addNewUser", user?._id); // to emmit/trigger the addNewUser
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket, user]);

  // send message
  useEffect(() => {
    if (!socket || typeof socket.emit !== "function") {
      console.error("Socket is not properly initialized or connected.");
      return;
    }

    const recipientID = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientID });
  }, [newMessage]);

  //  receive message and notification
  useEffect(() => {
    if (!socket || typeof socket.emit !== "function") {
      console.error("Socket is not properly initialized or connected.");
      return;
    }

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatID) return;
      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      console.log("NOTIFY", res);
      console.log("currentChat", currentChat);
      const isChatOpen = currentChat?.members.some((id) => id === res.senderID);

      if (isChatOpen) {
        setNotification((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotification((prev) => [res, ...prev]);
      }
    });

    return () => {
      socket.off("getMessage"); // to clean the socket
      socket.off("getNotification");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    // Get all the chats that this user
    const getUser = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Error:", response.error);
      }

      const pChats = response.filter((u) => {
        // check is Chat already created or not
        let isChatCreated = false;

        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
      setAllUsers(response);
    };

    getUser();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };
    getUserChats();
  }, [user, notification]);

  useEffect(() => {
    const getMessages = async () => {
      setIsmessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setIsmessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };
    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatID, setTextMessage) => {
      if (!textMessage || textMessage === "")
        return console.log("You must type something...");

      const response = await postRequest(`${baseUrl}/messages`, {
        chatID: currentChatID,
        senderID: sender._id,
        text: textMessage,
      });

      if (response.error) {
        return setSendTextMessageError(response.error);
      }

      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  });

  const creatChat = useCallback(async (firstID, secondID) => {
    const response = await postRequest(`${baseUrl}/chats`, {
      firstID,
      secondID,
    });
    if (!response.error) return console.log("Error creatign chat", response);

    setUserChats((prev) => [...prev, response]);
  });

  const markAllNotificationsRead = useCallback((notifications) => {
    const mNotifications = notifications.map((n) => {
      return { ...n, isRead: true };
    });
    setNotification(mNotifications);
  }, []);

  const markNotificationAsRead = useCallback(
    (n, userChats, user, notifications) => {
      // find chat to open

      const desiredChat = userChats.find((chat) => {
        const chatMembers = [user._id, n.senderID];
        const isDesiredChat = chat?.members.every((memeber) => {
          return chatMembers.includes(memeber);
        });
        return isDesiredChat;
      });

      // mark notification as read
      const mNotifications = notifications.map((el) => {
        if (n.sendID === el.sendID) {
          return { ...n, isRead: true };
        } else {
          return el;
        }
      });

      updateCurrentChat(desiredChat);
      setNotification(mNotifications);
    },
    []
  );

  const markThisUserNotificationsAsRead = useCallback(
    (thisUserNotifications, notifications) => {
      // mark notification as read

      const mNotifications = notifications.map((el) => {
        let notification;

        thisUserNotifications.forEach((n) => {
          if (n.senderID === el.senderID) {
            notification = { ...n, isRead: true };
          } else {
            notification = el;
          }
        });
        return notification;
      });

      setNotification(mNotifications);
    },
    []
  );

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isChatsLoading,
        userChatsError,
        potentialChats,
        creatChat,
        updateCurrentChat,
        currentChat,
        messages,
        ismessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,
        notification,
        allUsers,
        markAllNotificationsRead,
        markNotificationAsRead,
        markThisUserNotificationsAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
