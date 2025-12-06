import { Col, Row } from "reactstrap";
import UserCommentList from "./UserCommentList.js";

const UserComment = ({UserId}) => {

  return (
    <div className="app-user-list">
      <Row>
        <Col sm="12">
          <UserCommentList UserId={UserId}  />
        </Col>
      </Row>
    </div>
  );
};

export default UserComment;
