"use client";
import { CiSearch } from "react-icons/ci";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 flag?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
 ({ className, type, flag, ...props }, ref) => {
   return (
     <>
       <div className="flex w-full flex-row text-center justify-center items-center h-6 gap-1">
         <CiSearch size={20} className="flex flex-row justify-center" />
         {flag === "navbar" ? (
           <div className="hidden md:flex">
             <input
               onSubmit={() => {}}
               aria-label="Search"
               type={type}
               className={cn("flex text-sm w-full", className)}
               ref={ref}
               {...props}
             />
           </div>
         ) : (
           <div className="flex">
             <input
               onSubmit={() => {}}
               aria-label="Search"
               type={type}
               className={cn("flex text-sm w-full", className)}
               ref={ref}
               {...props}
             />
           </div>
         )}
       </div>
     </>
   );
 }
);

Input.displayName = "Input";
export { Input };