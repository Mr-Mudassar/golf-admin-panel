import {
  DELETE_COMMENT,
  UPDATE_COMMENT,
  GET_COMMENT_BY_POST,
} from "../../redux/features/queries";
import Spinner from "../spinner";
import toast from "react-hot-toast";
import CustomBtn from "../customBtn";
import { Form, Formik } from "formik";
import { TbEdit } from "react-icons/tb";
import CustomModal from "../customModal";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import CustomInputField from "../customInputField";
import { useMutation, useQuery } from "@apollo/client";
import { MdOutlineDeleteForever } from "react-icons/md";
import { EDIT_COMMENT_INITIAL_VALUES } from "../../validations/initialValues";
import { EDIT_COMMENT_VALIDATION_SCHEMA } from "../../validations/validationSchema";

interface CommentsComponentProps {
  postData: any;
}

const CommentsComponent: React.FC<CommentsComponentProps> = (props) => {
  const { postData } = props;
  const [postComments, setPostComments] = useState([]);
  const [deleteableCommentId, setDeleteableCommentId] = useState<any>();
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
  const [editableCommentId, setEditableCommentId] = useState<number | null>(
    null
  );

  console.log("delted comment id", deleteableCommentId);

  const {
    data: postCommentData,
    loading: postCommentLoading,
    error: postCommentError,
    refetch: refetchPostComment,
  } = useQuery(GET_COMMENT_BY_POST, {
    variables: {
      page: 1,
      postId: postData?.postid,
    },
  });

  useEffect(() => {
    setPostComments(postCommentData?.getCommentByPost);
  }, [postCommentData]);

  const [udaptedComment, { loading: updateCommentLoading }] =
    useMutation(UPDATE_COMMENT);

  const handleCommentUpdate = (values: any) => {
    udaptedComment({
      variables: {
        input: {
          ...values,
        },
      },
      onCompleted: () => {
        refetchPostComment();
        toast.success("Comment updated successfully!");
        setEditableCommentId(null);
      },
      onError: () => {
        toast.error("Error updating comment");
        setEditableCommentId(null);
      },
    });
  };

  const [deleteComment, { loading: deleteCommentLoading }] =
    useMutation(DELETE_COMMENT);

  return (
    <div>
      {postCommentLoading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {postCommentError && (
        <div className="flex justify-center items-center p-8">
          <p className="text-red-600">Failed to load comments</p>
        </div>
      )}
      {postComments?.map((item: any, index: number) => (
        <div
          key={index + item?.comment_id}
          className="flex flex-col sm:flex-row gap-2 mb-4 w-full items-center"
        >
          <img
            src={item?.userInfo?.photo_profile}
            alt={item?.userInfo?.photo_profile}
            className="rounded-full w-12 h-12"
          />
          <div className="w-full">
            <div className="bg-theme-secondaryBg rounded-lg p-3 ml-4">
              <div className="flex justify-between items-center">
                <p className="text-theme-primary text-md font-semibold">
                  {item?.userInfo?.first_name + " " + item?.userInfo?.last_name}
                </p>

                <span className="flex gap-2 cursor-pointer">
                  {editableCommentId === item?.comment_id ? (
                    <RxCross2
                      size={32}
                      onClick={() => setEditableCommentId(null)}
                      className="hover:bg-theme-primaryBg rounded-md text-theme-secondary p-1"
                    />
                  ) : (
                    <>
                      <TbEdit
                        size={20}
                        onClick={() => setEditableCommentId(item.comment_id)}
                        className="text-theme-btnBgText"
                      />
                      <MdOutlineDeleteForever
                        size={22}
                        onClick={() => {
                          setDeleteableCommentId(item);
                          setShowDeleteProfileModal(true);
                        }}
                        className="text-red-600 cursor-pointer"
                      />
                    </>
                  )}
                </span>
              </div>
              {editableCommentId === item.comment_id ? (
                <Formik
                  initialValues={{
                    ...EDIT_COMMENT_INITIAL_VALUES,
                    comment: item?.comment,
                  }}
                  onSubmit={(values) =>
                    handleCommentUpdate({
                      ...values,
                      type: item?.type,
                      likes: item.likes,
                      status: item?.status,
                      post_id: item?.post_id,
                      created: item?.created,
                      modified: item?.modified,
                      parent_id: item?.parent_id,
                      comment_id: item?.comment_id,
                      reply_count: item?.reply_count,
                    })
                  }
                  validationSchema={EDIT_COMMENT_VALIDATION_SCHEMA}
                >
                  {({
                    values,
                    // errors,
                    // touched,
                    handleBlur,
                    handleSubmit,
                    handleChange,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <CustomInputField
                        rows={3}
                        cols={100}
                        name={"comment"}
                        type={"textarea"}
                        value={values?.comment}
                        onBlurHandle={handleBlur}
                        onChangeHandle={handleChange}
                        disabled={editableCommentId !== item.comment_id}
                        // error={
                        //   errors.comment && touched.comment
                        //     ? errors.comment
                        //     : ""
                        // }
                      />
                      <CustomBtn
                        type={"submit"}
                        text={"Update"}
                        isLoading={updateCommentLoading}
                        className="font-normal text-sm px-2 rounded-sm"
                      />
                    </Form>
                  )}
                </Formik>
              ) : (
                <p className="text-theme-secondary text-lg">{item?.comment}</p>
              )}
            </div>
            <div className="ml-4 flex justify-around text-xs text-theme-secondary font-semibold">
              <p>{"2 days ago"}</p>
              <button onClick={() => window.alert("Like")}>
                Like({item?.likes?.length || 0})
              </button>
              <button onClick={() => window.alert("Reply")}>
                Reply({item?.reply_count || 0})
              </button>
            </div>
          </div>
        </div>
      ))}

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
              refetchPostComment();
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
