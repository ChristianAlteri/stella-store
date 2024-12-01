'use client';
import { url } from "inspector";
import Link from "next/link";
import { useParams } from "next/navigation";

interface IconRedirectButtonProps {
    icon: React.ReactElement | string;
    route: string;
}

const IconRedirectButton: React.FC<IconRedirectButtonProps> = ({
    icon,
    route,
}) => {
    const isMailto = route.startsWith("mailto:");
    const params = useParams()
    const URL = `${params.storeId}${route}`

    return (
        <div className="text-xs hover:underline hover:cursor-pointer">
            {isMailto ? (
                <a href={route}>
                    {icon}
                </a>
            ) : (
                <Link href={URL}>
                {icon}
            </Link>
            )}
        </div>
    );
}

export default IconRedirectButton;
// 'use client';

// import Link from "next/link";

// interface IconRedirectButtonProps {
//     icon: React.ReactElement | string;
//     route: string;
// }

// const IconRedirectButton: React.FC<IconRedirectButtonProps> = ({
//     icon,
//     route,
// }) => {
//     return ( 
//         <div className="text-xs hover:underline hover:cursor-pointer">
//             <Link href={route}>
//                 {icon}
//             </Link>
//         </div>
//     );
// }

// export default IconRedirectButton;
