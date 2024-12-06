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
import MobileProductExcludeFilter from "@/components/Filters/mobile-product-exclude-filter";

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
  const sortAlphabetically = (data: any[] | undefined) => {
    return data?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  };

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

          </div>
          <div className="row-span-4 p-4 overflow-y-auto h-full flex-row justify-center items-center shadow-2xl rounded-md border w-full">
              <div className="flex flex-row text-sm w-full items-center justify-center p-2 mb-2">
                <h2>
                  Set filters to find the perfect product for you
                </h2>
              </div>
            <div className="flex flex-col h-full w-full justify-start items-start overflow-y-auto gap-2">
              <div className="flex flex-col bg-white w-full justify-center items-center">
                <MobileProductFilter
                  valueKey="sizeId"
                  name="Sizes"
                  data={sortAlphabetically(sizes)}
                />
              </div>
              <div className="flex flex-col bg-white w-full justify-center items-center">
                <MobileProductFilter
                  valueKey="colorId"
                  name="Colors"
                  data={sortAlphabetically(colors)}
                />
              </div>
              <div className="flex flex-col bg-white w-full justify-center items-center">
                <MobileProductFilter
                  valueKey="materialId"
                  name="Materials"
                  data={sortAlphabetically(materials)}
                />
              </div>
              <div className="flex flex-col bg-white w-full justify-center items-center">
                <MobileProductFilter
                  valueKey="subcategoryId"
                  name="Sub-Category"
                  data={sortAlphabetically(subcategories)}
                />
              </div>
              <div className="flex flex-row items-center justify-center w-full">
                <button className='text-sm flex flex-col row-span-1 justify-start items-center hover:cursor-pointer hover:rounded-md hover:underline w-full' onClick={closeDrawer} >
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="row-span-4 p-4 mt-3 overflow-y-auto h-full">
            <div className="flex flex-col bg-white shadow-2xl rounded-md border">
              <RangeSlider />
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
              size={13}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterModal;


// "use client";

// import {
//   Category,
//   Color,
//   Condition,
//   Designer,
//   Gender,
//   Material,
//   Product,
//   Seller,
//   Size,
//   Subcategory,
// } from "@/types";
// import { Drawer } from "@material-tailwind/react";
// import React, { useState } from "react";
// import { GoFilter } from "react-icons/go";

// import MobileProductFilter from "../../Filters/mobile-product-filter";
// import NavbarScrollingBanner from "../../NavBar/components/navbar-scrolling-banner";
// import { MdArrowBackIos } from "react-icons/md";
// import RangeSlider from "../../Filters/range-slider";
// import MobileProductExcludeFilter from "@/components/Filters/mobile-product-exclude-filter";

// interface FilterModalProps {
//   colors: Color[] | undefined;
//   designers?: Designer[];
//   categories?: Category[];
//   sellers?: Seller[];
//   sizes?: Size[];
//   conditions?: Condition[];
//   materials?: Material[];
//   genders?: Gender[];
//   subcategories?: Subcategory[];
//   onSaleProducts?: Product[];
// }

// const FilterModal: React.FC<FilterModalProps> = ({
//   colors,
//   sizes,
//   materials,
//   subcategories,
//   onSaleProducts,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [isExclusionMode, setIsExclusionMode] = useState(false); // Toggle state for filtering in/out

//   const openDrawer = () => setOpen(true);
//   const closeDrawer = () => setOpen(false);

//   // Toggle between "filter for" and "filter out"
//   const toggleFilterMode = () => {
//     setIsExclusionMode(!isExclusionMode);
//   };

//   return (
//     <>
//       <div
//         onClick={openDrawer}
//         className="flex flex-row justify-center text-center text-xs hover:underline hover:cursor-pointer"
//       >
//         <GoFilter className="flex flex-row" size={23} />
//       </div>
//       <Drawer
//         open={open}
//         onClose={closeDrawer}
//         placement="right"
//         transition={{
//           type: "tween",
//           duration: 0.3,
//         }}
//         className="bg-white"
//         placeholder={undefined}
//         size={500}
//       >
//         <div className="grid grid-rows-10 h-full flex-row p-6 justify-center items-center w-full">
//           {open && (
//             <div className="row-span-1 w-full">
//               <NavbarScrollingBanner
//                 text="Enjoy a 20% off your first purchase by"
//                 underlinedText="creating an account."
//                 link="/for-you"
//               />
//             </div>
//           )}

//           <div className="flex flex-col row-span-1 justify-center items-center h-1/3 w-full">
//             {/* Toggle switch for Filter Mode */}
//           </div>

//           <div className="row-span-4 p-4 overflow-y-auto h-full flex-row justify-center items-center shadow-2xl rounded-md border w-full">
//             <div className="flex flex-row text-sm w-full items-center justify-center p-2 mb-2">
//             <div className="flex items-center justify-center mb-4">
//               <button
//                 onClick={toggleFilterMode}
//                 className="text-super-small p-2 rounded-full hover:underline transition"
//               >
//                 {isExclusionMode ? "Filter For" : "Filter Out"}
//               </button>
//             </div>
//               {/* <h2>Set filters to find the perfect product for you</h2> */}
//             </div>

//             <div className="flex flex-col h-full w-full justify-start items-start overflow-y-auto gap-2">
//               <div className="flex flex-col bg-white w-full justify-center items-center">
//                 {/* Conditionally render filter based on mode */}
//                 {isExclusionMode ? (
//                   <MobileProductExcludeFilter
//                     valueKey="sizeId"
//                     name="Sizes"
//                     data={sizes}
//                   />
//                 ) : (
//                   <MobileProductFilter
//                     valueKey="sizeId"
//                     name="Sizes"
//                     data={sizes}
//                   />
//                 )}
//               </div>

//               <div className="flex flex-col bg-white w-full justify-center items-center">
//                 {isExclusionMode ? (
//                   <MobileProductExcludeFilter
//                     valueKey="colorId"
//                     name="Colors"
//                     data={colors}
//                   />
//                 ) : (
//                   <MobileProductFilter
//                     valueKey="colorId"
//                     name="Colors"
//                     data={colors}
//                   />
//                 )}
//               </div>

//               <div className="flex flex-col bg-white w-full justify-center items-center">
//                 {isExclusionMode ? (
//                   <MobileProductExcludeFilter
//                     valueKey="materialId"
//                     name="Materials"
//                     data={materials}
//                   />
//                 ) : (
//                   <MobileProductFilter
//                     valueKey="materialId"
//                     name="Materials"
//                     data={materials}
//                   />
//                 )}
//               </div>

//               <div className="flex flex-col bg-white w-full justify-center items-center">
//                 {isExclusionMode ? (
//                   <MobileProductExcludeFilter
//                     valueKey="subcategoryId"
//                     name="Sub-Category"
//                     data={subcategories}
//                   />
//                 ) : (
//                   <MobileProductFilter
//                     valueKey="subcategoryId"
//                     name="Sub-Category"
//                     data={subcategories}
//                   />
//                 )}
//               </div>

//               <div className="flex flex-row items-center justify-center w-full">
//                 <button
//                   className="text-sm flex flex-col row-span-1 justify-start items-center hover:cursor-pointer hover:rounded-md hover:underline w-full"
//                   onClick={closeDrawer}
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="row-span-4 p-4 mt-3 overflow-y-auto h-full">
//             <div className="flex flex-col bg-white shadow-2xl rounded-md border">
//               <RangeSlider />
//             </div>
//           </div>

//           <div className="row-span-1 flex bg-transparent flex-row justify-between w-full p-1 text-center items-center h-1/3">
//             <MdArrowBackIos
//               className="hover:cursor-pointer"
//               onClick={closeDrawer}
//               size={13}
//             />
//           </div>
//         </div>
//       </Drawer>
//     </>
//   );
// };

// export default FilterModal;