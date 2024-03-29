'use client';

import { CiHeart } from "react-icons/ci";   
import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";


interface ProductCardButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
}


const ProductCardButton:React.FC <ProductCardButtonProps> = ({
onClick,
  icon,
  className
}) => {
    return ( 
        <button 
          onClick={onClick} 
          className=
            "flex items-center bg-transparent"
        >
          {icon}
        </button>
       );
    }
 
export default ProductCardButton;