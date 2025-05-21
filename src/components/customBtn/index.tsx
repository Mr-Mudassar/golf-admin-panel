import { memo } from "react";
import Spinner from "../spinner";
import React, { type ReactNode } from "react";

export interface CustomBtnProps {
  text: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  icon?: string | ReactNode;
  type: "button" | "submit" | "reset" | undefined;
  handleOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FillBtn: React.FC<CustomBtnProps> = (props) => {
  const {
    icon = "",
    text = "",
    className = "",
    type = "button",
    disabled = false,
    isLoading = false,
    handleOnClick = () => {},
  } = props;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={handleOnClick}
      className={`
         text-md bg-theme-btnBg !hover:bg-theme-btnColorHover text-theme-btnColor rounded-lg font-semibold px-4 py-2
        ${className}
      `}
    >
      <span className="flex items-center ">
        {!isLoading ? icon : <Spinner size="h-6 w-6 !bg-gray-200 mr-2" />}
        {text}
      </span>
    </button>
  );
};

export default memo(FillBtn);
