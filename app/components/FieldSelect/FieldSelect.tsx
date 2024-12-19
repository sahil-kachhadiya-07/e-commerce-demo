import React, { ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Select } from "../Select";
import { Options } from "../Select/Select";

export interface FieldSelectProps {
  name: string;
  defaultValue?: string;
  label?: ReactNode;
  options: Options[];
  classNames?: {
    labelClassName?: string;
    selectClassName?: string;
    selectContainerClassName?: string;
  };
  required?: boolean;
  firstChild?: string;
  rules?: any;
  onChange?: (e?: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FieldSelect: React.FC<FieldSelectProps> = ({
  name,
  options,
  label,
  classNames,
  required = false,
  defaultValue = "",
  firstChild,
  rules = {},
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <div className={classNames?.selectContainerClassName ?? ""}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <Select
              name={name}
              field={field}
              options={options || []}
              label={label}
              classNames={classNames}
              required={required}
              // defaultValue={defaultValue}
              firstChild={firstChild}
              {...props}
            />
            {fieldState.error && (
              <p className="text-red-500 text-md pt-2">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default FieldSelect;
