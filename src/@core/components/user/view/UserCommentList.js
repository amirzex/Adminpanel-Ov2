import React, { useState } from "react";
import {
  MoreVertical,
  Trash,
  Eye,
  User,
  CheckSquare,
  XSquare,
  Send,
} from "react-feather";
import {
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Card,
} from "reactstrap";

import CustomHeader from "../../../components/comments/list/CustomHeader";
import HeaderTable from "../../../components/header-table/HeaderTable";
import { CommentTableTitles } from "../../../components/comments/comments";
import {
  GetAllComments,
  AcceptCommentCourse,
  DeleteCourseComment,
  RejectCourseComment,
  GetReplayComments,
  AddReplayComment,
} from "../../../service/api/GetComment/GetComment";
import {
  useMutationWithRefetch,
  useQueryWithDependencies,
} from "../../../../utility/hooks/useCustomQuery";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../../components/pagination/index";
import { setPageNumber } from "../../../components/comments/store/CommentsList";
import AddReplyCommentModal from "../../../components/comments/AddReplyCommentModal";
import ReplaysCommentModal from "../../../components/comments/ReplaysCommentModal";
import { GetUserCommentList } from "../../../service/api/Getuserlist/Adminuserlist";

const UserCommentList = ({ UserId }) => {
  const commentFilterObj = useSelector((state) => state.CommentList);
  const dispatch = useDispatch();

  const [commentModal, setCommentModal] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const idsObj = { courseId, commentId };
  const [describe, setDescribe] = useState("");
  const [repShow, setRepShow] = useState(false);

  // ✅ Wrap API call in function so React Query runs it correctly
  const { data: commentsData, refetch: refetchComment } =
    useQueryWithDependencies(
      "GET_COMMENTS_DATA",
      () => GetUserCommentList(UserId),
      commentFilterObj,
      commentFilterObj
    );

  const { data: ReplayData, refetch: refetchReplay } = useQueryWithDependencies(
    "GET_REPLAY_COMMENT_DATA",
    () => GetReplayComments(idsObj),
    idsObj,
    idsObj
  );

  // Mutations
  const { mutate: acceptComment } = useMutationWithRefetch(
    "ACCEPT_COMMENT",
    AcceptCommentCourse,
    refetchComment,
    refetchReplay
  );
  const { mutate: declineComment } = useMutationWithRefetch(
    "DECLINE_COMMENT",
    RejectCourseComment,
    refetchComment,
    refetchReplay
  );
  const { mutate: deleteComment } = useMutationWithRefetch(
    "DELETE_COMMENT",
    DeleteCourseComment,
    refetchComment,
    refetchReplay
  );

  const DropdownItemArray = [
    { text: "تایید", icon: CheckSquare, apiFunction: acceptComment },
    { text: "حذف", icon: Trash, apiFunction: deleteComment },
    { text: "رد کردن", icon: XSquare, apiFunction: declineComment },
    {
      text: "پاسخ",
      icon: Send,
      apiFunction: setCommentId,
      other: () => setRepShow(true),
      SetCourseId: setCourseId,
    },
  ];

  const handlePagination = (page) => {
    dispatch(setPageNumber(page.selected + 1));
  };

  return (
    <div>
      <Card>
        <div className="react-dataTable">
          <CustomHeader />
          <div style={{ overflowX: "auto" }}>
            <Table hover>
              <HeaderTable titles={CommentTableTitles} />
              {Array.isArray(commentsData?.comments) &&
              commentsData.comments.length > 0 ? (
                commentsData.comments.map((item, index) => {
                  const tooltipId = `tooltip-${index}`;
                  return (
                    <tbody key={index}>
                      <tr>
                        <td
                          className="px-0"
                          style={{
                            maxWidth: "130px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <span className="mx-1 rounded border p">
                            <User />
                          </span>
                          <span>{item.userFullName.slice(0,10)}</span>
                        </td>
                        <td className="pr-0 pl-1" style={{ maxWidth: "150px" }}>
                          {item.commentTitle}
                        </td>
                        <td
                          className="pr-0 pl-1"
                          id={tooltipId}
                          style={{
                            maxWidth: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.describe}
                        </td>
                        <td className="px-0">{item.courseTitle}</td>
                        <td className="px-0 text-center">
                          {item.accept ? (
                            <Badge pill color="light-primary" className="me-1">
                              تایید شده
                            </Badge>
                          ) : (
                            <Badge pill color="light-warning" className="me-1">
                              تایید نشده
                            </Badge>
                          )}
                        </td>
                        <td
                          className="p-0 text-center"
                          style={{ maxWidth: "20px", minWidth: "20px" }}
                        >
                          {item.replyCount > 0 ? (
                            <Eye
                              style={{ width: "18px", height: "16px" }}
                              onClick={() => {
                                setCommentModal(true);
                                setCourseId(item.courseId);
                                setCommentId(item.commentId);
                                setDescribe(item.describe);
                              }}
                            />
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-0 text-center">
                          <UncontrolledDropdown direction="start">
                            <DropdownToggle
                              className="icon-btn hide-arrow"
                              color="transparent"
                              size="sm"
                              caret
                            >
                              <MoreVertical size={15} />
                            </DropdownToggle>
                            <DropdownMenu className="d-flex flex-column p-0">
                              {(item.accept === false
                                ? DropdownItemArray.slice(0, 2)
                                : DropdownItemArray.slice(1, 4)
                              ).map((dropDown, idx) => (
                                <DropdownItem
                                  key={idx}
                                  onClick={() => {
                                    dropDown.apiFunction(item.commentId);
                                    dropDown.other && dropDown.other();
                                    dropDown.SetCourseId &&
                                      dropDown.SetCourseId(item.courseId);
                                  }}
                                >
                                  <dropDown.icon className="me-50" size={15} />
                                  <span className="align-middle">
                                    {dropDown.text}
                                  </span>
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={7} className="text-center py-2">
                      کامنتی پیدا نشد!
                    </td>
                  </tr>
                </tbody>
              )}
            </Table>
          </div>
        </div>
      </Card>

      <CustomPagination
        total={commentsData?.totalCount}
        current={commentFilterObj?.PageNumber}
        rowsPerPage={commentFilterObj?.RowsOfPage}
        handleClickFunc={handlePagination}
      />

      <ReplaysCommentModal
        setCommentModal={setCommentModal}
        commentModal={commentModal}
        replayData={ReplayData}
        handleAcceptComment={acceptComment}
        handleDeclineComment={declineComment}
        handleDeleteComment={deleteComment}
        describe={describe}
        ids={idsObj}
        refetch={() => {
          refetchComment();
          refetchReplay();
        }}
      />

      <AddReplyCommentModal
        repShow={repShow}
        setRepShow={setRepShow}
        addReplyComment={AddReplayComment}
        ids={idsObj}
        refetch={() => {
          refetchComment();
          refetchReplay();
        }}
      />
    </div>
  );
};

export default UserCommentList;
