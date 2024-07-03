"use client";

import {
  Category,
  Color,
  Condition,
  Designer,
  Gender,
  Material,
  Product,
  Seller,
  Size,
  Subcategory,
} from "@/types";
import { Drawer } from "@material-tailwind/react";
import React from "react";
import { GoFilter } from "react-icons/go";

import MobileProductFilter from "../../Filters/mobile-product-filter";
import NavbarScrollingBanner from "../../NavBar/components/navbar-scrolling-banner";
import { MdArrowBackIos } from "react-icons/md";
import RangeSlider from "../../Filters/range-slider";

interface FilterModalProps {
  colors: Color[] | undefined;
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  sizes?: Size[];
  conditions?: Condition[];
  materials?: Material[];
  genders?: Gender[];
  subcategories?: Subcategory[];
  onSaleProducts?: Product[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  colors,
  sizes,
  materials,
  subcategories,
  onSaleProducts,
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
        <GoFilter className="flex flex-row" size={23} />
      </div>
      <Drawer
        open={open}
        onClose={closeDrawer}
        placement="right"
        transition={{
          type: "tween",
          duration: 0.3,
        }}
        className=" bg-white  "
        placeholder={undefined}
        size={500}
      >
        <div className="grid grid-rows-10 h-full flex-row p-6 justify-center items-center w-full">
          {open && (
            <div className="row-span-1 w-full">
              <NavbarScrollingBanner
                text="Enjoy a 20% off your first purchase by"
                underlinedText="creating an account."
                link="/for-you"
              />
            </div>
          )}

          <div className="flex flex-col row-span-1 justify-center items-center h-1/3 w-full">
            <RangeSlider />
          </div>

          <div className="row-span-4 p-4 overflow-y-auto h-full flex-row justify-center items-center shadow-2xl rounded-md border w-full">
            <div className="flex flex-col h-full w-full justify-start items-start overflow-y-auto gap-2">
              <div className="flex flex-col bg-white w-full justify-center items-center">
                <MobileProductFilter
                  valueKey="sizeId"
                  name="Sizes"
                  data={sizes}
                />
              </div>
              <div className="flex flex-col bg-white w-full justify-center items-center">
                <MobileProductFilter
                  valueKey="colorId"
                  name="Colors"
                  data={colors}
                />
              </div>
              <div className="flex flex-col bg-white w-full justify-center items-center">
                <MobileProductFilter
                  valueKey="materialId"
                  name="Materials"
                  data={materials}
                />
              </div>
              <div className="flex flex-col bg-white w-full justify-center items-center">
                <MobileProductFilter
                  valueKey="subcategoryId"
                  name="Sub-Category"
                  data={subcategories}
                />
              </div>
            </div>
          </div>

          <div className="row-span-4 p-4 mt-3 overflow-y-auto h-full">
            <div className="flex flex-col bg-white">
              {/* {onSaleProducts && (
                <MiniProductCard
                  miniProductRoute="/sale"
                  miniProductTitle="On Sale"
                  data={onSaleProducts}
                />
              )} */}
            </div>
          </div>

          <div className="row-span-1 flex bg-transparent flex-row justify-between w-full p-1 text-center items-center h-1/3">
            <MdArrowBackIos
              className="hover:cursor-pointer"
              onClick={closeDrawer}
              size={20}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterModal;
