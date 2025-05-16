import React, { useState } from "react";
import CustomModal from "../customModal";
import { useMutation } from "@apollo/client";
import { MdOutlineDeleteForever } from "react-icons/md";
import { DELETE_POST } from "../../redux/features/queries";
import toast from "react-hot-toast";

interface DELETE_VERIABLES {
  type: string;
  postid: string;
  created: string;
  geohash: string;
  user_tags: string[];
  group_tags: string[];
}
interface ActionMenuProps {
  className?: string;
  postData?: DELETE_VERIABLES;
}

const ActionMenu: React.FC<ActionMenuProps> = (props) => {
  const { className, postData } = props;
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      type: postData?.type,
      postid: postData?.postid,
      geohash: postData?.geohash,
      userTags: postData?.user_tags,
      postCreated: postData?.created,
      groupTags: postData?.group_tags,
    },

    onCompleted: (e) => {
      e.deletePost
        ? toast.success("Post deleted successfully")
        : toast.error("Failed to delete post");

      setShowDeleteProfileModal(false);
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  const ActionMenuOptions = [
    {
      name: "Delete",
      icon: "delete",
      action: () => setShowDeleteProfileModal(true),
    },
  ];

  return (
    <div
      className={`${className} bg-theme-secondaryBg absolute top-8 right-8 rounded-lg w-40 h-auto overflow-y-auto border border-theme-primaryBorder !containerz-50`}
    >
      <ul className="flex flex-col gap-2 p-2">
        {ActionMenuOptions.map((option, index) => (
          <li
            key={index + option.name}
            onClick={option.action}
            className="flex text-theme-primary items-center gap-1 p-1 text-sm hover:bg-theme-btnBg hover:text-theme-btnColor rounded-md cursor-pointer font-semibold"
          >
            <span className={`icon-${option.icon}`}></span>
            <span>{option.name}</span>
          </li>
        ))}
      </ul>

      <CustomModal
        modelSize="max-w-md"
        buttonText={"Delete"}
        buttonFunc={async () => {
          await deletePost();
        }}
        heading={"Delete Profile ?"}
        buttonStyles={"!bg-red-600 hover:bg-red-700 rounded-sm"}
        isOpen={showDeleteProfileModal}
        icon={
          <MdOutlineDeleteForever
            size={60}
            className="!bg-red-600 rounded-full text-theme-btnColor p-2"
          />
        }
        toggle={() => setShowDeleteProfileModal(!showDeleteProfileModal)}
        description={
          <p className="text-theme-secondary text-md font-semibold">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
        }
      />
    </div>
  );
};

export default ActionMenu;
