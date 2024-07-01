'use client';

import { MouseEventHandler } from "react";


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