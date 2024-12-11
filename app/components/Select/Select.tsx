import React, { ReactNode } from "react";

export interface Options {
  label: string;
  value: string;
}

export interface SelectProps {
  name: string;
  field?: any; // Typically, this will be a React Hook Form `field` prop
  defaultValue?: string;
  label?: ReactNode;
  options: Options[];
  classNames?: {
    labelClassName?: string;
    selectClassName?: string;
    selectContainerClassName?: string;
  };
  required?: boolean;
  firstChild?:string;
  onChange?: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  name,
  field,
  options,
  label,
  classNames,
  required,
  defaultValue = "",
  firstChild,
  ...props
}) => {
  return (
    <div
      className={`flex flex-col gap-1 ${
        classNames?.selectContainerClassName ?? ""
      }`}
    >
      {!!label && (
        <label
          htmlFor={name}
          className={`text-gray-500 text-sm ${classNames?.labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <select
        id={name}
        // defaultValue={defaultValue}
        {...field} // Spread the `field` for React Hook Form integration
        className={`border border-solid shadow-sm bg-white p-1 w-full rounded-lg focus:outline-none ${
          classNames?.selectClassName ?? ""
        }`}
        {...props}
      >
        <option value="" className="bg-white">{firstChild}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value} className="bg-white">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
