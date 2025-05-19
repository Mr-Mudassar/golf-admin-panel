import React, { memo, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

interface InputFieldProps {
  type: string;
  name: string;
  value: string;
  cols?: number;
  label?: string;
  rows?: number;
  error?: string;
  disabled?: boolean;
  mainClass?: string;
  className?: string;
  placeholder?: string;
  iconPosition?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  autoComplete?: string | boolean;
  onBlurHandle?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChangeHandle?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleKeyPress?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const CustomInputField: React.FC<InputFieldProps> = (props) => {
  const {
    icon,
    name = "",
    label = "",
    error = "",
    rows = 5,
    cols = 30,
    value = "",
    type = "text",
    mainClass = "",
    className = "",
    placeholder = "",
    disabled = false,
    style = undefined,
    autoComplete = "on",
    iconPosition = "right",
    onBlurHandle = () => {},
    onChangeHandle = () => {},
    handleKeyPress = () => {},
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={`w-full ${mainClass}`}>
      <label
        htmlFor="input"
        className="text-sm flex text-theme-secondary font-semibold"
      >
        {label}
      </label>

      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id="input"
            rows={rows}
            cols={cols}
            name={name}
            style={style}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onBlur={(e) => onBlurHandle?.(e)}
            onChange={(e) => onChangeHandle?.(e)}
            className={`mt-1 rounded-sm w-full p-1 border border-theme-secondaryBg transition-all ${className}`}
          />
        ) : (
          <input
            id="input"
            type={
              type === "password"
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : type
            }
            name={name}
            style={style}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onBlur={(e) => onBlurHandle?.(e)}
            autoComplete={autoComplete as string}
            onChange={(e) => onChangeHandle?.(e)}
            onKeyDown={(e) => handleKeyPress?.(e)}
            min={type === "number" ? 0 : ""}
            step={type === "number" ? "any" : ""}
            className={`mt-1 rounded-sm w-full py-2 border border-theme-primaryBorder transition-all
            ${iconPosition === "left" ? "ps-10" : "px-3"}
            ${type === "password" ? "pr-14" : ""} ${className} ${
              type === "number" ? "appearance-none" : ""
            }`}
          />
        )}

        {type === "password" && (
          <div
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-6 cursor-pointer"
          >
            {isPasswordVisible ? (
              <GoEyeClosed className="text-theme-secondary" />
            ) : (
              <GoEye className="text-theme-secondary" />
            )}
          </div>
        )}

        {icon && (
          <div
            className={`absolute cursor-pointer flex items-center justify-center text-theme-primary ${
              iconPosition === "left" ? "left-4 top-5.5" : "right-4 top-5"
            }`}
          >
            {icon}
          </div>
        )}
      </div>
      {error && <p className="text-red-600 text-xs text-start ml-2">{error}</p>}
    </div>
  );
};

export default memo(CustomInputField);  