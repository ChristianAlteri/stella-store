import { MouseEventHandler } from "react";

import { cn } from "@/lib/utils";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className
}) => {
  return ( 
    <button 
      onClick={onClick} 
      className={cn(
        'rounded-md flex items-center justify-center bg-white border p-1 hover:scale-120 transition',
        className
      )}
    >
      {icon}
    </button>
   );
}

export default IconButton;