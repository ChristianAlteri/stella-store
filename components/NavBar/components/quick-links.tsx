'use client';

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const QuickLinks = () => {
  const pathname = usePathname();
  const params = useParams();

  const links = [
    { href: `/${process.env.NEXT_PUBLIC_STORE_ID}`, label: 'NEW ARRIVALS' },
    { href: `/${process.env.NEXT_PUBLIC_STORE_ID}/top-sellers`, label: 'TOP SELLERS' },
    { href: `/${process.env.NEXT_PUBLIC_STORE_ID}/trending?sort=most-liked`, label: 'TRENDING ITEMS' },
    { href: `/${process.env.NEXT_PUBLIC_STORE_ID}/sale`, label: 'SALE', className: 'text-red-500' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex flex-col lg:text-sm text-xs justify-center items-center rounded-xl w-full h-full hover:underline",
            link.className
          )}
        >
          <div
            className={cn(
              "w-full flex flex-col justify-center items-center",
              pathname === link.href
                ? "underline text-light-font"
                : "text-stone-300",
              link.className
            )}
          >
            {link.label}
          </div>
        </Link>
      ))}
    </>
  );
};

export default QuickLinks;



// "use client";

// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";


// const QuickLinks = () => {
//   const pathname = usePathname();
//   const isRouteSelected = (route: string) => pathname === route;
//   const params = useParams();

//   return (
//     <>
//       <Link
//         href={`/${process.env.NEXT_PUBLIC_API_URL}`}
//         className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-full h-full hover:underline "
//       >
//         <div
//           className={cn(
//             isRouteSelected(`/${process.env.NEXT_PUBLIC_API_URL}`)
//               ? " underline w-full flex flex-col justify-center items-center text-light-font lg:text-sm text-super-small rounded-md h-full"
//               : "text-stone-300 flex flex-col justify-center items-center"
//           )}
//         >
//           NEW ARRIVALS
//         </div>
//       </Link>
//       <Link
//         href={`/${process.env.NEXT_PUBLIC_API_URL}/top-sellers`}
//         className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-full h-full hover:underline "
//       >
//         <div
//           className={cn(
//             isRouteSelected(`/${process.env.NEXT_PUBLIC_API_URL}/top-sellers`)
//               ? "underline w-full flex flex-col justify-center items-center text-light-font lg:text-sm text-super-small rounded-md h-full"
//               : "text-stone-300 flex flex-col justify-center items-center w-full"
//           )}
//         >
//           TOP SELLERS
//         </div>
//       </Link>
//       <Link
//         href={`/${process.env.NEXT_PUBLIC_API_URL}/trending?sort=most-liked`}
//         className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-full h-full hover:underline "
//       >
//         <div
//           className={cn(
//             isRouteSelected(`/${process.env.NEXT_PUBLIC_API_URL}/trending`)
//               ? " underline w-full flex flex-col justify-center items-center text-light-font lg:text-sm text-super-small rounded-md h-full"
//               : "text-stone-300 flex flex-col justify-center items-center w-full"
//           )}
//         >
//           TRENDING ITEMS
//         </div>
//       </Link>

//       <Link
//         href={`/${process.env.NEXT_PUBLIC_API_URL}/sale`}
//         className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-full h-full hover:underline "
//       >
//         <div
//           className={cn(
//             isRouteSelected(`/${process.env.NEXT_PUBLIC_API_URL}/sale`)
//               ? " underline w-full flex flex-col justify-center items-center text-red-500 lg:text-sm text-super-small rounded-md h-full"
//               : "text-red-500 flex flex-col justify-center items-center"
//           )}
//         >
//           SALE
//         </div>
//       </Link>
//     </>
//   );
// };

// export default QuickLinks;
