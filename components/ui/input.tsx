'use client'

import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        <input 
        onSubmit={() => {}} 
        aria-label="Search"
          type={type}
          className={cn(
            "flex items-center justify-center text-center h-7 w-1/6 border-b bg-background px-2 py-2 text-sm  file:bg-transparent file:text-sm file:font-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
