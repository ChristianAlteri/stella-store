"use client";

import React from "react";
import {
  Product,
} from "@/types";
import { CiSliderHorizontal } from "react-icons/ci";
import { Drawer } from "@material-tailwind/react";
import AllSortFilters from "../../Filters/all-sort-filters";

interface FooterSortProps {
  products: Product[] | undefined;
}

const FooterSort: React.FC<FooterSortProps> = ({
  products,
}) => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);


  return (
    <>
      <div
        onClick={openDrawer}
        className="flex flex-row justify-center text-center text-xs hover:underline hover:cursor-pointer"
      >
        <CiSliderHorizontal className="flex flex-row" size={23} />
      </div>
      <Drawer
        open={open}
        onClose={closeDrawer}
        placement="bottom"
        transition={{
          type: "spring",
          duration: 0.2,
        }}
        className=" bg-white"
        placeholder={undefined}
        size={70}
      >
        <div className="h-full absolute text-xs flex flex-col items-center justify-center  w-full  min-h-[55px] mb-4 shadow-top bg-white">
          <div className="flex flex-row w-full justify-center items-center gap-8">

            <AllSortFilters 
             data={products}
            />

          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FooterSort;
