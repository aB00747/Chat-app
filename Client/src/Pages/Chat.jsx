import { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
import ChatBox from "../Component/Chat/ChatBox";
import {
  Alert,
  Button,
  Form,
  Row,
  Col,
  Stack,
  Container,
} from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import UserChat from "../Component/Chat/UserChat";
import PotentialChats from "../Component/Chat/PotentialChats";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isChatsLoading, userChatsError, updateCurrentChat } = useContext(ChatContext);
  return (
    <>
      <Container>
        <PotentialChats />
        {userChats?.length < 1 ? (
          nul
        ) : (
          <Stack>
            <Stack direction="horizontal" gap={4} className="align-items-start">
              <Stack className="messages-box flex-grow-0 pe-3">
                {isChatsLoading && <p>Loding chats...</p>}
                {userChats?.map((chat, index) => {
                  return (
                    <div key={index} onClick={() => updateCurrentChat(chat)}>
                      {<UserChat chat={chat} user={user} />}
                    </div>
                  );
                })}
              </Stack>
              <ChatBox />
            </Stack>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Chat;
