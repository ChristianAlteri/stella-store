'use client'

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface AuthInputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors<FieldValues>;
    disabled?: boolean;
}

const AuthInput: React.FC<AuthInputProps>  = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
    return ( 
        <div>
          <label 
            htmlFor={id} 
            className="
              block 
              text-sm 
              font-medium 
              leading-6 
              text-black
            "
          >
            {label}
          </label>
          <div className="mt-2">
            <input
              id={id}
              type={type}
              autoComplete={id}
              disabled={disabled}
              {...register(id, { required })}
              className={clsx(`
                form-input
                block 
                w-full 
                rounded-md 
                border-0 
                py-1.5 
                text-black
                shadow-sm 
                ring-1 
                ring-inset 
                ring-black 
                placeholder:text-black-500
                focus:ring-2 
                focus:ring-inset 
                focus:ring-light-font
                sm:text-sm 
                sm:leading-6`,
                errors[id] && 'focus:ring-red-600',
                disabled && 'opacity-50 cursor-default'
              )}
            />
          </div>
        </div>
       );
    }

 
export default AuthInput;