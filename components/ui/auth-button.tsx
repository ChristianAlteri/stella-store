'use client'

import clsx from "clsx";

interface AuthButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return ( 
    <button
      onClick={onClick}
      type={type}
          disabled={disabled}
          className={clsx(`
            flex 
            justify-center 
            rounded-md 
            px-3 
            py-2 
            text-sm 
            font-semibold 
            focus-visible:outline 
            focus-visible:outline-2 
            focus-visible:outline-offset-2 
            border
            `,
            disabled && 'opacity-50 cursor-default',
            fullWidth && 'w-full',
            secondary ? 'text-white' : 'text-black ',
            danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
            !secondary && !danger && ' hover:bg-light-background focus-visible:outline-light-font'
          )}
        >
          {children}
        </button>
       );
    }
 
export default AuthButton;