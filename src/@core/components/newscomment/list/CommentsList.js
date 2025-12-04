import React, { useState } from "react";
import {
  MoreVertical,
  Trash,
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

import CustomHeader from "./CustomHeader";
import HeaderTable from "../../header-table/HeaderTable";
import { CommentTableTitles } from "../../comments/comments";

import {
  AcceptCommentCourse,
  DeleteCourseComment,
  RejectCourseComment,
  GetReplayComments,
  AddReplayComment,
  GetCourseComments,
  GetnewsComments
} from "../../../service/api/GetComment/GetComment";

import {
  useMutationWithRefetch,
  useQueryWithDependencies,
} from "../../../../utility/hooks/useCustomQuery";

import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../pagination";
import { setPageNumber } from "../store/CommentsList";

import AddReplyCommentModal from "../AddReplyCommentModal";
import ReplaysCommentModal from "../ReplaysCommentModal";

const CommentsListnews = ({ id }) => {
  console.log(id,"aaaaaaaa");
  const dispatch = useDispatch();
  const commentFilterObj = useSelector((state) => state.CommentList);

  const [commentModal, setCommentModal] = useState(false);
  const [repShow, setRepShow] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const [describe, setDescribe] = useState("");

  const idsObj = { courseId, commentId };

  /* -------------------- Queries -------------------- */

  const { data: commentsData = [], refetch: refetchComment } =
    useQueryWithDependencies(
      ["GET_COMMENTS_DATA", id, commentFilterObj],
      () => GetnewsComments(id),
      commentFilterObj
    );

  const { data: replayData, refetch: refetchReplay } =
    useQueryWithDependencies(
      ["GET_REPLAY_COMMENT_DATA", idsObj],
      GetReplayComments,
      idsObj
    );

  /* -------------------- Mutations -------------------- */

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

  /* -------------------- Helpers -------------------- */

  const handlePagination = (page) => {
    dispatch(setPageNumber(page.selected + 1));
  };

  const DropdownItemArray = [
    { text: "تایید", icon: CheckSquare, action: acceptComment },
    { text: "حذف", icon: Trash, action: deleteComment },
    { text: "رد کردن", icon: XSquare, action: declineComment },
    {
      text: "پاسخ",
      icon: Send,
      action: (commentId) => {
        setCommentId(commentId);
        setRepShow(true);
      },
    },
  ];

  /* -------------------- Render -------------------- */

  return (
    <>
      <Card>
        <div className="react-dataTable">
          <CustomHeader />

          <div style={{ overflowX: "auto" }}>
            <Table hover>
              <HeaderTable titles={CommentTableTitles} />

              <tbody>
                {commentsData.length > 0 ? (
                  commentsData.map((item) => {
                    const actions = item.accept
                      ? DropdownItemArray.slice(1)
                      : DropdownItemArray.slice(0, 2);

                    return (
                      <tr key={item.id}>
                        {/* Author */}
                        <td
                          style={{
                            maxWidth: "130px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <span className="mx-1 rounded border p">
                            <User size={14} />
                          </span>
                          {item.author || "نامشخص"}
                        </td>

                        {/* Title */}
                        <td style={{ maxWidth: "150px" }}>
                          {item.title && item.title !== "undefined"
                            ? item.title
                            : "-"}
                        </td>

                        {/* Describe */}
                        <td
                          style={{
                            maxWidth: "200px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.describe && item.describe !== "undefined"
                            ? item.describe
                            : "-"}
                        </td>

                        {/* Course */}
                        <td>{item.courseId}</td>

                        {/* Status */}
                        <td className="text-center">
                          {item.accept ? (
                            <Badge pill color="light-primary">
                              تایید شده
                            </Badge>
                          ) : (
                            <Badge pill color="light-warning">
                              تایید نشده
                            </Badge>
                          )}
                        </td>

                        {/* Replies */}
                        <td className="text-center">-</td>

                        {/* Actions */}
                        <td className="text-center">
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
                              {actions.map((itemDrop, index) => (
                                <DropdownItem
                                  key={index}
                                  onClick={() => {
                                    itemDrop.action(item.id);
                                    setCourseId(item.courseId);
                                    setDescribe(item.describe);
                                  }}
                                >
                                  <itemDrop.icon
                                    className="me-50"
                                    size={15}
                                  />
                                  {itemDrop.text}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-2">
                      کامنتی پیدا نشد!
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Card>

      {/* Pagination */}
      <CustomPagination
        total={commentsData.length}
        current={commentFilterObj.PageNumber}
        rowsPerPage={commentFilterObj.RowsOfPage}
        handleClickFunc={handlePagination}
      />

      {/* Reply list modal */}
      <ReplaysCommentModal
        commentModal={commentModal}
        setCommentModal={setCommentModal}
        replayData={replayData}
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

      {/* Add reply modal */}
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
    </>
  );
};

export default CommentsListnews;
