"use client";

import { useState } from "react";
import { Box, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category, Designer } from "@/types";

interface DesignerProps {
  data: Designer[];
}

const DesignerNav: React.FC<DesignerProps> = ({ data }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Menu>
      <MenuButton onClick={handleToggle} className="text-sm text-stone-700 rounded-md p-2 font-medium transition-colors hover:text-stone-900 hover:bg-secondary hover:underline hover:cursor-pointer">
        Designers
      </MenuButton>
      <MenuList>
        {data.map((route) => (
          <MenuItem key={route.id}>
            <Link href={`/designer/${route.id}`}>
              <p
                className={cn(
                  "text-sm font-medium transition-colors hover:text-stone-900",
                  pathname === `/designer/${route.id}` ? "text-stone" : "text-stone-500"
                )}
              >
                {route.name}
              </p>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default DesignerNav;
