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
      disabled={disabled}
      onClick={handleOnClick}
      className={`
         text-md bg-theme-btnBg text-theme-btnColor rounded-lg font-semibold px-4 py-2
        ${className}
      `}
    >
      {!isLoading ? (
        <>
          <span className="flex items-center ">
            {icon} {text}
          </span>
        </>
      ) : (
        <Spinner size="h-8 w-8 !ng-white" />
      )}
    </button>
  );
};

export default memo(FillBtn);
