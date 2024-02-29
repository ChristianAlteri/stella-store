"use client";

import { useState } from "react";
import { Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category, Designer, Seller } from "@/types";

interface SellerProps {
  data: Seller[];
}

const SellerNav: React.FC<SellerProps> = ({ data }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  // console.log("data", data);

  return (
    <Menu>
      {/* <a href={`/sellers`}> */}
      <MenuButton onClick={handleToggle} className="text-sm text-stone-700 rounded-md p-2 font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer">
        Sellers
      </MenuButton>
      {/* </a> */}
      <MenuList>
        {data.map((route) => (
          <MenuItem key={route.id}>
            <Link href={`/sellers/${route.id}`}>
              <p
                className={cn(
                  "text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                  pathname === `/seller/${route.id}` ? "text-stone" : "text-stone-500"
                )}
              >
                {route.instagramHandle.replace('@', '').toUpperCase()}
              </p>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SellerNav;
