import { Eye, EyeClosed} from 'lucide-react'
import React, { ReactNode, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export interface InputProps extends React.ComponentProps<'input'> {
  name: string
  defaultValue?: string
  label?: ReactNode
  classNames?: {
    labelClassName?: string
    inputClassName?: string
    InputContainerClassName?: string
  }
  required?: boolean
  type?: string
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  name,
  defaultValue = '',
  label,
  classNames,
  required,
  onChange,
  type,
  ...props
}) => {
  const [visible, setVisible] = useState(false)
  const formContext = useFormContext()
  if (!formContext) {
    return (
      <div
        className={`flex flex-col gap-1 ${
          classNames?.InputContainerClassName ?? ''
        }`}
      >
        {!!label && (
          <label
            className={`text-gray-500 text-sm ${classNames?.labelClassName}`}
          >
            {label} <span className='required'>{required ? ' *' : ''}</span>
          </label>
        )}
        <input
          className={`border border-solid shadow-sm p-1 w-full rounded-lg focus:outline-none ${classNames?.inputClassName}`}
          {...props}
          type={type}
        />
      </div>
    )
  }
  return (
    <>
      <div
        className={`flex flex-col gap-1 ${
          classNames?.InputContainerClassName ?? ''
        }`}
      >
        {!!label && (
          <label
            className={`text-gray-500 text-sm ${classNames?.labelClassName}`}
          >
            {label} <span className='required'>{required ? ' *' : ''}</span>
          </label>
        )}
        {type === 'password' ? (
          <div className='relative'>
            <input
              defaultValue={defaultValue}
              className={`border border-solid shadow-sm p-1 w-full rounded-lg focus:outline-none ${classNames?.inputClassName}`}
              type={`${visible === true ? 'text' : 'password'}`}
              {...props}
              {...formContext.register(name, { onChange: onChange })}
            />
            {visible === true ? (
              <Eye
                className='absolute right-[5px] cursor-pointer top-[6px] text-gray-400'
                size={20}
                onClick={() => setVisible(prev => !prev)}
              />
            ) : (
              <EyeClosed
                className='absolute right-[5px] cursor-pointer top-[6px] text-gray-400'
                size={20}
                onClick={() => setVisible(prev => !prev)}
              />
            )}
          </div>
        ) : (
          <input
            defaultValue={defaultValue}
            className={`border border-solid shadow-sm p-1 w-full rounded-lg focus:outline-none  ${classNames?.inputClassName}`}
            type={type}
            {...props}
            {...formContext.register(name, { onChange: onChange })}
          />
        )}
      </div>
    </>
  )
}

export default Input
