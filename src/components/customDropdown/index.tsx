import React, { memo } from "react";
import { FaAsterisk } from "react-icons/fa";

interface DropdownProps {
  name: string;
  error?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  mainClass?: string;
  className?: string;
  labelClass?: string;
  placeholder?: string;
  value: string | number;
  optionsStyling?: string;
  showPlaceholder?: boolean;
  placeholderDisabled?: boolean;
  Options: { label: string; value: string | number }[];
  onBlurHandle?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeHandle: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const CustomDropdown = (props: DropdownProps) => {
  const {
    name,
    value,
    error,
    label,
    Options,
    disabled,
    required,
    mainClass,
    className,
    labelClass,
    placeholder,
    onBlurHandle,
    optionsStyling,
    onChangeHandle,
    showPlaceholder = true,
    placeholderDisabled = true,
  } = props;

  return (
    <div className={`m-0 text-black ${mainClass}`}>
      <label className={`font-semibold flex gap-x-1 ${labelClass} `}>
        {label}{" "}
        {required && (
          <FaAsterisk size={8} className="inline text-red-600 mb-2" />
        )}
      </label>
      <select
        className={`mt-1 border border-gray-300 p-2 pr-10 rounded-lg w-maz transition-all hover:ring-[#3f5f27] hover:ring-opacity-30 focus:outline-none focus:border-[#3f5f27]focus:ring-[#3f5f27] focus:ring focus:ring-opacity-30 focus-visible:outline-none focus-visible:border-[#3f5f27] focus-visible:ring-opacity-30 ${className}`}
        name={name}
        value={value}
        disabled={disabled}
        onBlur={onBlurHandle}
        onChange={onChangeHandle}
      >
        {showPlaceholder && (
          <option value="" disabled={placeholderDisabled}>
            {placeholder}
          </option>
        )}
        {Options &&
          Options?.map((item: { label: string; value: string | number }, index: number) => (
            <option
              key={index}
              value={item?.value}
              className={`text-black ${optionsStyling}`}
            >
              {item.label}
            </option>
          ))}
      </select>
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
};

export default memo(CustomDropdown);
