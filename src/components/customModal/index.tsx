import { RxCross2 } from "react-icons/rx";
import React, { useEffect, memo, type ReactNode } from "react";
import CustomBtn from "../customBtn";

interface ModelProps {
  rounded?: string;
  icon?: ReactNode;
  isOpen?: boolean;
  toggle: () => void;
  modelSize?: string;
  subHeading?: string;
  cancelBtn?: boolean;
  buttonText?: string;
  buttonStyles?: string;
  buttonFunc?: () => void;
  heading: string | ReactNode;
  description?: ReactNode | string;
}

const Model: React.FC<ModelProps> = ({
  icon,
  toggle,
  heading,
  buttonText,
  buttonFunc,
  description,
  isOpen = false,
  subHeading = "",
  buttonStyles = "",
  cancelBtn = false,
  modelSize = "w-lg",
  rounded = "rounded-xl",
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-black/30 bg-transform bg-scale-x-[-1] bg-opacity-30 z-50 w-full h-screen m-0 p-0">
      <div
        className={`${modelSize} ${rounded}  max-w-[90%] max-h-[90vh] overflow-y-auto p-1 bg-theme-secondaryBg relative border border-theme-primaryBorder m-4`}
      >
        <RxCross2
          size={32}
          onClick={toggle}
          className="hover:bg-theme-primaryBg rounded-md text-theme-secondary p-1 absolute top-1 right-1 cursor-pointer"
        />
        <div className="p-4">
          <div className="text-start my-3">{icon}</div>
          <h4 className="text-2xl font-semibold text-start text-theme-primary">
            {heading}
          </h4>
          <h6 className="text-sm text-theme-secondary">{subHeading}</h6>
          <div className="text-sm text-theme-secondary mt-2 p-2 mb-2">
            {description}
          </div>
          <div className="flex justify-end gap-4">
            {cancelBtn && (
              <CustomBtn text="Cancel" type="button" handleOnClick={toggle} />
            )}

            {buttonText && (
              <CustomBtn
                icon=""
                type="button"
                text={buttonText}
                handleOnClick={buttonFunc}
                className={`font-normal cursor-pointer bg-  ${buttonStyles}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Model);
