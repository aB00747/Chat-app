import {
  Children,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { baseUrl, getRequest, postRequest } from "../utils/Services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);

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
  }, [user]);

  const creatChat = useCallback(async (firstID, secondID) => {
    const response = await postRequest(`${baseUrl}/chats`, {
      firstID,
      secondID,
    });
    if (!response.error) return console.log("Error creatign chat", response);

    setUserChats((prev) => [...prev, response]);
  });

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isChatsLoading,
        userChatsError,
        potentialChats,
        creatChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
