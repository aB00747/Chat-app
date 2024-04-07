import { useFetchRecipientUser } from "../../Hooks/UserFetchRecipient";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import maleAvater  from "../../assets/MalePic.svg";
import femaleAvater  from "../../assets/FemalePic.svg";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={maleAvater} height="35px" alt="" />
          {/* <img src={gender == "F" ? femaleAvater : maleAvater} alt="" /> */}
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Message here</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/02/2022</div>
        <div className="this-user-notifications">2</div>
        <div className="user-online"></div>
      </div>
    </Stack>
  );
};

export default UserChat;
