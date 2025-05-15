import React, { useState } from "react";
import CustomModal from "../customModal";
import { MdOutlineDeleteForever } from "react-icons/md";
interface ActionMenuProps {
  className?: string;
}

const ActionMenu: React.FC<ActionMenuProps> = (props) => {
  const { className } = props;
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);

  const ActionMenuOptions = [
    // {
    //   name: "Edit",
    //   icon: "edit",
    //   action: () => {
    //     window.alert("Working in progress");
    //   },
    // },
    {
      name: "Delete",
      icon: "delete",
      action: () => {
        setShowDeleteProfileModal(true);
      },
    },
  ];

  return (
    <div
      className={`${className} bg-theme-secondaryBg absolute top-8 right-8 rounded-lg w-40 h-auto overflow-y-auto !containerz-50`}
    >
      <ul className="flex flex-col gap-2 p-2">
        {ActionMenuOptions.map((option, index) => (
          <li
            key={index + option.name}
            onClick={option.action}
            className="flex text-theme-primary items-center gap-1 p-1 text-sm hover:bg-theme-primaryBg rounded-md cursor-pointer"
          >
            <span className={`icon-${option.icon}`}></span>
            <span>{option.name}</span>
          </li>
        ))}
      </ul>

      <CustomModal
        modelSize="max-w-md"
        buttonText={"Delete"}
        heading={"Delete Profile ?"}
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
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
        }
      />
    </div>
  );
};

export default ActionMenu;
