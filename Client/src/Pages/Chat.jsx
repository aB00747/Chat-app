import { useContext, useState } from "react";
import { ChatContext } from "../Context/ChatContext";
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
import UserChat  from "../Component/Chat/UserChat";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isChatsLoading, userChatsError } = useContext(ChatContext);
  console.log("userCat", userChats);
  return (
    <>
      <Container>
        {userChats?.length < 1 ? (
          nul
        ) : (
          <Stack>
            <Stack direction="horizontal" gap={4} className="align-items-start">
              <Stack className="messages-box flex-grow-0 pe-3">
                {isChatsLoading && <p>Loding chats...</p>}
                {userChats?.map((chat, index) => {
                  return (
                    <div key={index}>
                      {<UserChat chat={chat} user={user} />}
                    </div>
                  );
                })}
              </Stack>
              <p>CheckBox</p>
            </Stack>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Chat;
