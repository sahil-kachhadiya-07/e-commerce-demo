import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import classes from "./button.module.css"
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant | string
  children: ReactNode
  leftAdornment?: ReactNode
  rightAdornment?: ReactNode
  className?: string
  iconClassName?: string
  loading?:boolean
}

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  FORM="form",
  TEXT = 'text'
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  leftAdornment,
  rightAdornment,
  disabled = false,
  loading,
  ...props
}) => {

  const renderButtonVariant = () => {
    switch (variant) {
      case ButtonVariant.SECONDARY:
        return classes.secondary
      case ButtonVariant.TEXT:
        return classes.text
        case ButtonVariant.FORM:
          return classes.form
      default:
        return classes.primary
    }
  }
  return (
    <>
      {!!leftAdornment && (
        <span className={`{iconClassName}`}>{leftAdornment}</span>
      )}
      <button
        className={`flex items-center focus:outline-none justify-center py-2 gap-2 px-4 rounded ${
          disabled ? '!cursor-not-allowed' : renderButtonVariant()
        } ${className}`}
        {...props}
      >
       {loading && <Loader2 className='animate-spin' />}{children} 
      </button>
      {!!rightAdornment && (
        <span className={`{iconClassName}`}>{rightAdornment}</span>
      )}
    </>
  )
}

export default Button
