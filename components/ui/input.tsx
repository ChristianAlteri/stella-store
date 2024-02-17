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
            "flex justify-start text-start h-7 border-b bg-background  text-sm  file:bg-transparent file:text-sm file:font-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
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
