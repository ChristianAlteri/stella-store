'use client'
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType;
    onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
     icon: Icon,
    onClick
}) => {
    return ( 
        <button
          type="button"
          onClick={onClick}
          className="
            inline-flex
            w-full 
            justify-center 
            rounded-md 
            bg-white
            px-4 
            py-2 
            text-black
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            hover:bg-light-background
            focus:outline-offset-0
            border
          "
        >
          <Icon />
        </button>
       );
    }

 
export default AuthSocialButton;