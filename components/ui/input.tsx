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
      <div className="flex flex-row lg:w-full w-1/2 justify-between items-center h-6 border-b  gap-1">
        <CiSearch size={17} className="flex flex-row justify-center"/>
        <input 
        onSubmit={() => {}} 
        aria-label="Search"
          type={type}
          className={cn(
            "flex flex-row  bg-background text-sm file:bg-transparent file:text-sm file:font-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
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
