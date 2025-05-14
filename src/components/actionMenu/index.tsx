import React from "react";
interface ActionMenuProps {
  className?: string;
}

const ActionMenu: React.FC<ActionMenuProps> = (props) => {
  const { className } = props;

  const ActionMenuOptions = [
    {
      name: "Add to Favorites",
      icon: "star",
      action: () => {
        window.alert("Working in progress");
      },
    },
    {
      name: "Bookmark",
      icon: "bookmark",
      action: () => {
        window.alert("Working in progress");
      },
    },
    {
      name: "Block User",
      icon: "block",
      action: () => {
        window.alert("Working in progress");
      },
    },
    {
      name: "Report User",
      icon: "report",
      action: () => {
        window.alert("Working in progress");
      },
    },
    {
      name: "Edit",
      icon: "edit",
      action: () => {
        window.alert("Working in progress");
      },
    },
    {
      name: "Delete",
      icon: "delete",
      action: () => {
        window.alert("Working in progress");
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
            key={index}
            onClick={option.action}
            className="flex text-theme-primary items-center gap-1 p-1 text-sm hover:bg-theme-primaryBg rounded-md cursor-pointer"
          >
            <span className={`icon-${option.icon}`}></span>
            <span>{option.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActionMenu;
