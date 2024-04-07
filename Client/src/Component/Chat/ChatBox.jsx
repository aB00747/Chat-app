import { useContext } from "react";
import moment from "moment";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { useFetchRecipientUser } from "../../Hooks/UserFetchRecipient";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, ismessagesLoading, messagesError } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  if (!recipientUser)
    return <p className="no-selected-chat">No Conversation Selected Yet....</p>;

  if (ismessagesLoading)
    return <p className="no-selected-chat">Loading chats...</p>;
  console.log("NNNNNNNNNNN", messages);

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages.map((message, index) => {
            return (
              <Stack key={index} className={`${message?.senderID === user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}>
                <span>{message.text}</span>
                <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                {/* Yesterday at 5:53 PM - use of calendar() */}
              </Stack>
            );
          })}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
