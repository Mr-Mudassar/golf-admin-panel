import { useState } from "react";
import toast from "react-hot-toast";
import CustomBtn from "../customBtn";
import { Form, Formik } from "formik";
import { TbEdit } from "react-icons/tb";
import CustomModal from "../customModal";
import { RxCross2 } from "react-icons/rx";
import CustomInputField from "../customInputField";
import { CommentsData } from "../../data/commentsData";
import { MdOutlineDeleteForever } from "react-icons/md";
import { EDIT_COMMENT_INITIAL_VALUES } from "../../validations/initialValues";
import { EDIT_COMMENT_VALIDATION_SCHEMA } from "../../validations/validationSchema";

const CommentsComponent = () => {
  const [editableCommentId, setEditableCommentId] = useState<number | null>(
    null
  );
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  const handleCommentUpdate = (values: typeof EDIT_COMMENT_INITIAL_VALUES) => {
    console.log("Updated Comment: ", values);
    toast.success("Comment updated successfully!");
    setEditableCommentId(null); // Reset the editable comment after updating
  };

  return (
    <div>
      {CommentsData.map((item, index) => (
        <div key={index + item.id} className="flex flex-col sm:flex-row gap-2 mb-4">
          <img
            src={item?.user?.profilePicture}
            alt={item?.user?.profilePicture}
            className="rounded-full w-12 h-12"
          />
          <div>
            <div className="bg-theme-secondaryBg rounded-lg p-3 ml-4 ">
              <div className="flex justify-between items-center">
                <p className="text-theme-primary text-lg font-semibold">
                  {item?.user?.name}
                </p>

                <span className="flex gap-2 cursor-pointer">
                  {editableCommentId === item.id ? (
                    <RxCross2
                      size={32}
                      onClick={() => setEditableCommentId(null)}
                      className="hover:bg-theme-primaryBg rounded-md text-theme-secondary p-1"
                    />
                  ) : (
                    <>
                      <TbEdit
                        size={20}
                        onClick={() => setEditableCommentId(item.id)}
                        className="text-theme-btnBgText"
                      />
                      <MdOutlineDeleteForever
                        size={22}
                        onClick={() => setShowDeleteProfileModal(true)}
                        className="text-red-600 cursor-pointer"
                      />
                    </>
                  )}
                </span>
              </div>
              {editableCommentId === item.id ? (
                <Formik
                  initialValues={EDIT_COMMENT_INITIAL_VALUES}
                  onSubmit={(values) => handleCommentUpdate(values)}
                  validationSchema={EDIT_COMMENT_VALIDATION_SCHEMA}
                >
                  {({
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <CustomInputField
                        rows={3}
                        cols={100}
                        name={"comment"}
                        type={"textarea"}
                        value={item?.comment}
                        onBlurHandle={handleBlur}
                        disabled={editableCommentId !== item.id}
                        onChangeHandle={(e) => {
                          console.log("Valuesssssssss", e.target.value);
                          setFieldValue("comment", e.target.value);
                        }}
                        error={
                          errors.comment && touched.comment
                            ? errors.comment
                            : ""
                        }
                      />
                      <CustomBtn
                        type={"submit"}
                        text={"Update"}
                        className="font-normal text-sm px-2 rounded-sm"
                      />
                    </Form>
                  )}
                </Formik>
              ) : (
                <p className="text-theme-secondary">{item?.comment}</p>
              )}
            </div>
            <div className="ml-4 flex justify-around text-xs text-theme-secondary font-semibold">
              <p>{"2 days ago"}</p>
              <button onClick={() => window.alert("Like")}>Like</button>
              <button onClick={() => window.alert("Reply")}>Reply</button>
            </div>
          </div>
        </div>
      ))}

      <CustomModal
        modelSize="max-w-md"
        buttonText={"Delete"}
        heading={"Delete Comment ?"}
        buttonStyles={"bg-red-600 hover:bg-red-700 rounded-sm"}
        isOpen={showDeleteProfileModal}
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
