'use client';

import Link from "next/link";

interface IconRedirectButtonProps {
    icon: React.ReactElement | string;
    route: string;
}

const IconRedirectButton: React.FC<IconRedirectButtonProps> = ({
    icon,
    route,
}) => {
    return ( 
        <div className="text-xs hover:underline hover:cursor-pointer">
            <Link href={route}>
                {icon}
            </Link>
        </div>
    );
}

export default IconRedirectButton;
