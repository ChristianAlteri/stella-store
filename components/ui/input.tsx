'use client'
import { CiSearch } from "react-icons/ci";
import * as React from "react"

import { cn } from "@/lib/utils"


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
      <div className="flex w-full flex-row text-center justify-center items-center h-6 gap-1">
        <CiSearch size={17} className="flex flex-row justify-center"/>
        <input 
        onSubmit={() => {}} 
        aria-label="Search"
          type={type}
          className={cn(
            "flex text-sm w-full",
            className
          )}
          ref={ref}
          {...props}
        />
        
        </div>
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
