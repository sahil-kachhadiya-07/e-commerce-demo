'use client'
import React, { ChangeEvent } from 'react'
import { useFormContext } from 'react-hook-form'
import Input, { InputProps } from '../Input/Input'

interface FieldInputProps  extends Omit<InputProps, "register">  {
  classNames?: {
    labelClassName?: string
    inputClassName?: string
    inputContainerClassName?: string 
  }
  label?: string
  name: string
  type?: string
  onChange?:any
}


const FieldInput: React.FC<FieldInputProps> = ({
  classNames,
  label,
  name,
  onChange,
  type = 'text',
  ...props
}) => {
  const { formState} = useFormContext() || { formState: { errors: {} } };
  const { errors } = formState;
  return (
    <>
      <Input
        label={label}
        name={name}
        classNames={classNames}
        type={type}
        onChange={onChange}
        {...props}
      />
      {errors[name] && (
        <p  className="text-red-100">{errors[name]?.message?.toString()}</p>
      )}
    </>
  )
}

export default FieldInput
