import toast from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import CustomModal from "../customModal";
import { useMutation } from "@apollo/client";
import { MdOutlineDeleteForever } from "react-icons/md";
import { DELTE_USER_POST } from "../../redux/features/queries";

interface DELETE_VERIABLES {
  type: string;
  userInfo: any;
  postid: string;
  created: string;
  geohash: string;
  user_tags: string[];
  group_tags: string[];
}
interface ActionMenuProps {
  className?: string;
  refetch: (postid: string | undefined) => void;
  onClose: () => void;
  postData?: DELETE_VERIABLES;
}

const ActionMenu: React.FC<ActionMenuProps> = (props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { onClose, className, postData, refetch } = props;
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (typeof onClose === "function") {
          onClose();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props]);

  const [deletePost, { loading: deletePostLoading }] = useMutation(
    DELTE_USER_POST,
    {
      variables: {
        user_id: postData?.userInfo?.userid,
        created: postData?.created,
      },
      onCompleted: (e) => {
        e.deleteUserPost
          ? (toast.success("Post deleted successfully"),
            refetch(postData?.postid))
          : toast.error("Failed to delete post");

        setShowDeleteProfileModal(false);
      },
      onError: () => {
        toast.error("Failed to delete post");
      },
    }
  );

  const ActionMenuOptions = [
    {
      name: "Delete",
      icon: <MdOutlineDeleteForever size={20} className="text-" />,
      action: () => setShowDeleteProfileModal(true),
    },
  ];

  return (
    <div
      ref={menuRef}
      className={`${className} bg-theme-secondaryBg absolute top-8 right-8 rounded-md  w-40 h-auto overflow-y-auto border border-theme-primaryBorder !containerz-50`}
    >
      <ul className="flex flex-col gap-2 p-2">
        {ActionMenuOptions.map((option, index) => (
          <li
            key={index + option.name}
            onClick={option.action}
            className="flex text-theme-primary items-center gap-1 p-2 text-sm hover:bg-theme-btnBg hover:text-theme-btnColor rounded-sm cursor-pointer font-semibold"
          >
            {option?.icon}
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
        heading={"Delete Post?"}
        buttonLoading={deletePostLoading}
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
