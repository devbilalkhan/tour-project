import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

const sizeClassNames = {
  medium: 'py-2 px-8',
  small: '',
}

const baseClassNames = {
  default: `bg-gray-900 rounded text-white font-bold hover:bg-pink-700 dark:hover:bg-pink-700 shadow-2xl dark:bg-white dark:text-black dark:hover:text-white`,
}

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassNames
  base?: keyof typeof baseClassNames
  color?: string
  isDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = 'medium',
  base = 'default',
  isDisabled = false,
  ...props
}) => {
  console.log(props)

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`${sizeClassNames[size]} ${baseClassNames[base]} `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
