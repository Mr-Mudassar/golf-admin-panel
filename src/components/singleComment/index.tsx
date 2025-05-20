import React, { type Dispatch, type SetStateAction } from "react";
import moment from "moment";
import CustomBtn from "../customBtn";
import { Form, Formik } from "formik";
import { TbEdit } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";
import CustomInputField from "../customInputField";
import { MdOutlineDeleteForever } from "react-icons/md";
import { EDIT_COMMENT_INITIAL_VALUES } from "../../validations/initialValues";
import { EDIT_COMMENT_VALIDATION_SCHEMA } from "../../validations/validationSchema";
import { ReturnError } from "../../utils/functions";

interface SingleCommentProps {
  item: any;
  FetchReply: any;
  updateCommentLoading: boolean;
  editableCommentId: number | null;
  handleCommentUpdate: (values: any) => void;
  showReplyCommentModal: (text: boolean) => void;
  setCommentParentID: (commend_id: string) => void;
  setShowDeleteProfileModal: Dispatch<SetStateAction<boolean>>;
  setEditableCommentId: Dispatch<SetStateAction<number | null>>;
  setDeleteableCommentId: Dispatch<SetStateAction<number | null>>;
}

const SingleComment: React.FC<SingleCommentProps> = (props) => {
  const {
    item,
    FetchReply,
    editableCommentId,
    setCommentParentID,
    handleCommentUpdate,
    setEditableCommentId,
    showReplyCommentModal,
    setDeleteableCommentId,
    setShowDeleteProfileModal,
    updateCommentLoading = false,
  } = props;
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full items-start">
        <img
          src={item?.userInfo?.photo_profile}
          alt={item?.userInfo?.photo_profile}
          className="rounded-full !w-12 !h-12 border border-theme-primaryBorder"
          onClick={() =>
            navigate(`/userProfile/${item?.userInfo?.userid}`, {
              state: {
                profileData: {
                  userId: item?.userInfo?.userid,
                },
              },
            })
          }
        />
        <div className="w-full">
          <div className="bg-theme-primaryBg rounded-lg p-3 ml-4 border border-theme-secondaryBg">
            <div className="flex justify-between items-center">
              <p
                className="text-theme-primary text-md font-semibold"
                onClick={() =>
                  navigate(`/userProfile/${item?.userInfo?.userid}`, {
                    state: {
                      profileData: {
                        userId: item?.userInfo?.userid,
                      },
                    },
                  })
                }
              >
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
                    status: item?.status,
                    post_id: item?.post_id,
                    created: item?.created,
                    modified: item?.modified,
                    parent_id: item?.parent_id,
                    comment_id: item?.comment_id,
                    reply_count: item?.reply_count,
                    likes: !item.likes ? [] : item.likes,
                  })
                }
                validationSchema={EDIT_COMMENT_VALIDATION_SCHEMA}
              >
                {({
                  values,
                  errors,
                  touched,
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
                      error={ReturnError(errors, touched, "comment")}
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
              <p className="text-theme-secondary text-lg break-words">
                {item?.comment}
              </p>
            )}
          </div>
          <div className="ml-4 flex justify-around text-xs text-theme-secondary font-semibold">
            <p>{moment(parseInt(item?.created)).fromNow()}</p>
            <button onClick={() => window.alert("Like")}>
              Like({item?.likes?.length || 0})
            </button>
            {!item?.parent_id && (
              <button
                onClick={() => {
                  setCommentParentID(item?.comment_id);
                  FetchReply({
                    variables: {
                      parentId: item.comment_id,
                      page: 1,
                    },
                  });
                  showReplyCommentModal(true);
                }}
              >
                Reply({item?.reply_count || 0})
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleComment;
