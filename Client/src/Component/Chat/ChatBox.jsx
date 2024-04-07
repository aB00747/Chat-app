import { useContext, useState } from "react";
import moment from "moment";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { useFetchRecipientUser } from "../../Hooks/UserFetchRecipient";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    messages,
    ismessagesLoading,
    messagesError,
    sendTextMessage,
  } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  console.log("textMessage", textMessage);

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
              <Stack
                key={index}
                className={`${
                  message?.senderID === user?._id
                    ? "message self align-self-end flex-grow-0"
                    : "message align-self-start flex-grow-0"
                }`}
              >
                <span>{message.text}</span>
                <span className="message-footer">
                  {moment(message.createdAt).calendar()}
                </span>
                {/* Yesterday at 5:53 PM - use of calendar() */}
              </Stack>
            );
          })}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input-flex-grow-0">
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          fontFamily="nunito"
          borderColor="rgba(72,112,223,0.2)"
        />
        <button
          className="send-btn"
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
