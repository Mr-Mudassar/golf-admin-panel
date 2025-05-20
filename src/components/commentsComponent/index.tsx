import {
  DELETE_COMMENT,
  UPDATE_COMMENT,
  GET_COMMENT_BY_POST,
  GET_COMMENT_BY_PARENT,
} from "../../redux/features/queries";
import Spinner from "../spinner";
import toast from "react-hot-toast";
import CustomBtn from "../customBtn";
import CustomModal from "../customModal";
import { useEffect, useState } from "react";
import SingleComment from "../singleComment";
import { MdExpandMore, MdOutlineDeleteForever } from "react-icons/md";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

interface CommentsComponentProps {
  postData: any;
}

const CommentsComponent: React.FC<CommentsComponentProps> = (props) => {
  const { postData } = props;
  const [commentPage, setCommentPage] = useState<number>(1);
  const [postComments, setPostComments] = useState<any[]>([]);
  const [commentParentId, setCommentParentID] = useState<string>();
  const [commentReplyPage, setCommentReplyPage] = useState<number>(1);
  const [deleteableCommentId, setDeleteableCommentId] = useState<any>();
  const [commentReplyDataArr, setCommentReplyDataArr] = useState<any[]>([]);
  const [replyCommentModal, showReplyCommentModal] = useState<boolean>(false);
  const [showDeleteProfileModal, setShowDeleteProfileModal] =
    useState<boolean>(false);
  const [editableCommentId, setEditableCommentId] = useState<number | null>(
    null
  );

  const {
    data: postCommentData,
    loading: postCommentLoading,
    error: postCommentError,
    refetch: refetchPostComment,
  } = useQuery(GET_COMMENT_BY_POST, {
    variables: {
      page: commentPage,
      postId: postData?.postid,
    },
  });

  useEffect(() => {
    if (postCommentData?.getCommentByPost) {
      setPostComments((prev: any[]) => {
        const filteredComments = postCommentData?.getCommentByPost.filter(
          (newComment: any) =>
            !prev.some(
              (existingComment: any) =>
                existingComment.comment_id === newComment.comment_id
            )
        );
        return [...prev, ...filteredComments];
      });
    }
  }, [postCommentData]);

  const handleLoadMoreComments = async (commentPage: number) => {
    refetchPostComment({
      variables: {
        page: commentPage,
        postId: postData?.postid,
      },
    });
    setCommentPage(commentPage);
  };

  const [udaptedComment, { loading: updateCommentLoading }] =
    useMutation(UPDATE_COMMENT);

  const UpdateCommentFromLocalState = (comment: any) => {
    setPostComments((prev: any[]) =>
      prev.map((item: any) =>
        item.comment_id === editableCommentId ? { ...comment } : item
      )
    );
  };

  const handleCommentUpdate = (values: any) => {
    udaptedComment({
      variables: {
        input: {
          ...values,
        },
      },
      onCompleted: () => {
        UpdateCommentFromLocalState({ comment: values?.comment });
        UpdateCommentReplyFromLocal({ comment: values?.comment });
        setEditableCommentId(null);
        toast.success("Comment updated successfully!");
      },
      onError: () => {
        toast.error("Error updating comment");
        setEditableCommentId(null);
      },
    });
  };

  const [deleteComment, { loading: deleteCommentLoading }] =
    useMutation(DELETE_COMMENT);

  const DeleteCommentFromLocalState = () => {
    setPostComments((prev: any) =>
      prev.filter(
        (item: any) => item.comment_id !== deleteableCommentId?.comment_id
      )
    );
  };

  const [
    FetchReply,
    {
      data: commentReplyData,
      error: commentReplyError,
      loading: commentReplyLoading,
    },
  ] = useLazyQuery(GET_COMMENT_BY_PARENT);

  useEffect(() => {
    if (commentReplyData?.getCommentByParentId) {
      setCommentReplyDataArr((prev: any[]) => {
        const filteredComments = commentReplyData?.getCommentByParentId.filter(
          (newComment: any) =>
            !prev.some(
              (existingComment: any) =>
                existingComment.comment_id === newComment.comment_id
            )
        );
        return [...prev, ...filteredComments];
      });
    }
  }, [commentReplyData]);

  const handleLoadMoreReply = async (replyPage: number) => {
    console.log(replyPage);
    FetchReply({
      variables: {
        page: replyPage,
        parentId: commentParentId,
      },
    });
    setCommentReplyPage(replyPage);
  };

  const DeleteCommentReplyFromLocal = () => {
    setCommentReplyDataArr((prev: any[]) =>
      prev?.filter(
        (item: any) => item.comment_id !== deleteableCommentId?.comment_id
      )
    );
  };

  const UpdateCommentReplyFromLocal = (comment: any) => {
    setCommentReplyDataArr((prev: any[]) =>
      prev?.map((item: any) =>
        item.comment_id === editableCommentId ? { ...item, ...comment } : item
      )
    );
  };

  return (
    <div>
      {postCommentError && (
        <div className="flex justify-center items-center p-8">
          <p className="text-red-600">Failed to load comments</p>
        </div>
      )}
      {postComments?.map((item: any, index: number) => (
        <SingleComment
          item={item}
          FetchReply={FetchReply}
          key={index + item.comment_id}
          editableCommentId={editableCommentId}
          setCommentParentID={setCommentParentID}
          handleCommentUpdate={handleCommentUpdate}
          updateCommentLoading={updateCommentLoading}
          setEditableCommentId={setEditableCommentId}
          showReplyCommentModal={showReplyCommentModal}
          setDeleteableCommentId={setDeleteableCommentId}
          setShowDeleteProfileModal={setShowDeleteProfileModal}
        />
      ))}

      {postCommentLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!postCommentError && postCommentData?.getCommentByPost?.length === 10 ? (
        <div className="flex justify-center">
          <CustomBtn
            type="button"
            text="Load more"
            isLoading={postCommentLoading}
            icon={<MdExpandMore size={24} />}
            className="text-sm !rounded-3xl m-6"
            handleOnClick={() => {
              handleLoadMoreComments(commentPage + 1);
            }}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center py-8">
          <p className="text-theme-secondary">No more comments</p>
        </div>
      )}

      <CustomModal
        heading={"Comment replies"}
        isOpen={replyCommentModal}
        modelSize="w-[80%] md:w-[60%] lg:w-[40%]"
        toggle={() => showReplyCommentModal(!replyCommentModal)}
        description={
          <>
            {commentReplyLoading && (
              <div className="flex justify-center">
                <Spinner />
              </div>
            )}
            {commentReplyError && (
              <div className="flex justify-center items-center p-8">
                <p className="text-red-600">Failed to load comments</p>
              </div>
            )}

            {commentReplyDataArr?.map((item: any, index: number) => (
              <SingleComment
                item={item}
                FetchReply={FetchReply}
                key={index + item?.comment_id}
                editableCommentId={editableCommentId}
                setCommentParentID={setCommentParentID}
                handleCommentUpdate={handleCommentUpdate}
                updateCommentLoading={updateCommentLoading}
                setEditableCommentId={setEditableCommentId}
                showReplyCommentModal={showReplyCommentModal}
                setDeleteableCommentId={setDeleteableCommentId}
                setShowDeleteProfileModal={setShowDeleteProfileModal}
              />
            ))}

            {!commentReplyLoading &&
            commentReplyData?.getCommentByParentId?.length >= 10 ? (
              <div className="flex justify-center">
                <CustomBtn
                  type="button"
                  text="Load more"
                  isLoading={commentReplyLoading}
                  icon={<MdExpandMore size={24} />}
                  className="text-sm !rounded-3xl m-6"
                  handleOnClick={() => {
                    handleLoadMoreReply(commentReplyPage + 1);
                  }}
                />
              </div>
            ) : (
              <div className="flex justify-center items-center py-8">
                <p className="text-theme-secondary">No more comments</p>
              </div>
            )}
          </>
        }
      />

      <CustomModal
        modelSize="max-w-md"
        buttonText={"Delete"}
        buttonFunc={async () =>
          await deleteComment({
            variables: {
              postCreated: postData?.created,
              post_id: deleteableCommentId?.post_id,
              postUserId: postData?.userInfo?.userid,
              comment_id: deleteableCommentId?.comment_id,
              CommentCreated: deleteableCommentId?.created,
            },
            onCompleted: () => {
              // refetchReplies();
              // refetchPostComment();
              DeleteCommentFromLocalState();
              DeleteCommentReplyFromLocal();
              setShowDeleteProfileModal(false);
              toast.success("Comment deleted successfully!");
            },
            onError: () => {
              toast.error("Failed to delete comment");
            },
          })
        }
        heading={"Delete Comment ?"}
        isOpen={showDeleteProfileModal}
        buttonLoading={deleteCommentLoading}
        buttonStyles={"!bg-red-600 hover:bg-red-700 rounded-sm"}
        icon={
          <MdOutlineDeleteForever
            size={60}
            className="bg-red-600 rounded-full text-theme-btnColor p-2"
          />
        }
        toggle={() => setShowDeleteProfileModal(!showDeleteProfileModal)}
        description={
          <p className="text-theme-secondary text-md font-semibold">
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </p>
        }
      />
    </div>
  );
};

export default CommentsComponent;
