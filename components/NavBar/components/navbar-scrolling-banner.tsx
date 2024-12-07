'use client';

import Link from "next/link";
import { useParams } from "next/navigation";

interface NavbarScrollingBannerProps {
    text?: string;
    link?: string;
    underlinedText?: string;
}

const NavbarScrollingBanner: React.FC<NavbarScrollingBannerProps> = ({
    text, 
    link,
    underlinedText,
}) => {
  const params = useParams()
  return (
    <>
     <div className="h-1/2 top-0 bg-white flex-row justify-end items-end w-full">
        <div className="animate-loop-scroll ">
        {text}{" "}
            <Link className="underline" href={`${link}`}>
            {underlinedText}
            </Link>
        </div>
     </div>
    </>
  );
};

export default NavbarScrollingBanner;
