"use client";

import { Drawer } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Category, Designer, Seller } from "@/types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface HamburgerMenuProps {
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  designers,
  categories,
  sellers,
}) => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <div
        onClick={openDrawer}
        className="flex flex-row justify-center text-center text-xs hover:underline hover:cursor-pointer"
      >
        <CiMenuBurger
          size={17}
          className="md:hidden flex flex-row justify-center"
        />
      </div>
      <Drawer
        open={open}
        onClose={closeDrawer}
        placement="left"
        transition={{
          type: "tween",
          duration: 0.3,
        }}
        className=" bg-white opacity-95 "
        placeholder={undefined}
        size={500}
      >
        <div />
      </Drawer>
    </>
  );
};

export default HamburgerMenu;

// return (
//   <>
//     <div
//       onClick={openDrawer}
//       className="flex flex-row justify-center text-center text-xs hover:underline hover:cursor-pointer"
//     >
//       <CiMenuBurger
//         size={17}
//         className="md:hidden flex flex-row justify-center"
//       />
//     </div>
//     <Drawer
//       open={open}
//       onClose={closeDrawer}
//       placement="left"
//       transition={{
//         type: "tween",
//         duration: 0.3,
//       }}
//       className=" bg-white opacity-95 "
//       placeholder={undefined}
//       size={500}
//     >
//       <div className="grid grid-cols-1 gap-4 p-4 h-full">
//         <div className="grid grid-rows-3 h-1/2 justify-start items-start">
//           <div className="row-span-1 h-full">
//             <Link
//               className="hover:underline underline bg-white"
//               href={`/sellers`}
//             >
//               Sellers
//             </Link>
//             <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
//               {sellers?.map((seller, index) => (
//                 <Link
//                   href={`/sellers/${seller.id}`}
//                   key={seller.instagramHandle}
//                 >
//                   <p
//                     className={cn(
//                       "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
//                       pathname === `/seller/${seller.id}`
//                         ? "text-stone"
//                         : "text-stone-500"
//                     )}
//                   >
//                     {seller.instagramHandle}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="row-span-1 h-full">
//             <Link
//               className="hover:underline underline bg-white"
//               href={`/designers`}
//             >
//               Designers
//             </Link>
//             <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
//               {designers?.map((designer, index) => (
//                 <Link href={`/designers/${designer.id}`} key={designer.name}>
//                   <p
//                     className={cn(
//                       "flex justify-start text-sm hover:text-stone-900 hover:underline hover:cursor-pointer",
//                       pathname === `/designer/${designer.id}`
//                         ? "text-stone"
//                         : "text-stone-500"
//                     )}
//                   >
//                     {designer.name}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="row-span-1 h-full">
//             <Link
//               className="hover:underline underline bg-white"
//               href={`/categories`}
//             >
//               Categories
//             </Link>
//             <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
//               {categories?.map((category, index) => (
//                 <Link href={`/categories/${category.id}`} key={category.name}>
//                   <p
//                     className={cn(
//                       "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
//                       pathname === `/category/${category.id}`
//                         ? "text-stone"
//                         : "text-stone-500"
//                     )}
//                   >
//                     {category.name}
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Drawer>
//   </>
// );
