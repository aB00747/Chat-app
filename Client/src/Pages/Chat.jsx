import { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatContext";

const Chat = () => {
  const { userChats, isChatsLoading, userChatsError } = useContext(ChatContext);
  console.log("userCat", userChats);
  return <>Chat</>;
};

export default Chat;
