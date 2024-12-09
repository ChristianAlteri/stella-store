"use client";

import {
  Category,
  Color,
  Condition,
  Designer,
  Gender,
  Material,
  Size,
  Subcategory,
  Seller,
} from "@/types";
import { Drawer } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { GoFilter } from "react-icons/go";
import MobileProductFilter from "../../Filters/mobile-product-filter";
import NavbarScrollingBanner from "../../NavBar/components/navbar-scrolling-banner";
import { MdArrowBackIos } from "react-icons/md";
import RangeSlider from "../../Filters/range-slider";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getMaterials from "@/actions/get-materials";
import getSubcategories from "@/actions/get-sub-categories";

interface FilterModalProps {
  genders?: Gender[];
}

const resourceFetchers = {
  size: getSizes,
  color: getColors,
  material: getMaterials,
  subcategory: getSubcategories,
};

const FilterModal: React.FC<FilterModalProps> = () => {
  const [open, setOpen] = useState(false);
  const [resources, setResources] = useState<Record<string, any[]>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    size: true,
    color: true,
    material: true,
    subcategory: true,
  });

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const sortAlphabetically = (data: any[] | undefined) => {
    return data?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!process.env.NEXT_PUBLIC_STORE_ID) return;

      const fetchPromises = Object.entries(resourceFetchers).map(
        async ([key, fetcher]) => {
          try {
            const data = await fetcher(`${process.env.NEXT_PUBLIC_STORE_ID}`);
            setResources((prev) => ({ ...prev, [key]: data }));
          } catch (error) {
            console.error(`Failed to fetch ${key}:`, error);
          } finally {
            setLoadingStates((prev) => ({ ...prev, [key]: false }));
          }
        }
      );

      await Promise.all(fetchPromises);
    };

    fetchData();
  }, []);

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
        placeholder={undefined}
        onClose={closeDrawer}
        placement="right"
        transition={{
          type: "tween",
          duration: 0.3,
        }}
        className="bg-white"
        size={500}
      >
        <div className="grid grid-rows-10 h-full p-6">
          {open && (
            <div className="row-span-1 w-full">
              <NavbarScrollingBanner
                text="Enjoy a 20% off your first purchase by"
                underlinedText="creating an account."
                link="/for-you"
              />
            </div>
          )}

          <div className="row-span-4 p-4 overflow-y-auto shadow-2xl rounded-md border">
            <div className="text-sm w-full items-center text-center p-2 mb-2">
              <h2>Set filters to find the perfect product for you</h2>
            </div>

            <div className="flex flex-col gap-2">
              {["size", "color", "material", "subcategory"].map((key) => (
                <div key={key}>
                  {loadingStates[key] ? (
                    <div className="w-full text-center text-super-small text-muted-foreground">
                      Loading...
                    </div>
                  ) : (
                    <div className="bg-white w-full">
                      <MobileProductFilter
                        valueKey={`${key}Id`}
                        name={key.charAt(0).toUpperCase() + key.slice(1)}
                        data={sortAlphabetically(resources[key])}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center w-full mt-4">
              <button
                className="text-sm hover:cursor-pointer hover:rounded-md hover:underline"
                onClick={closeDrawer}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="row-span-4 p-4 mt-3 overflow-y-auto h-full">
            <div className="flex flex-col w-full justify-center items-center">
              <RangeSlider />
            </div>
          </div>

          <div className="row-span-1 flex justify-between w-full p-1">
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
// import React, { useEffect, useState } from "react";
// import { GoFilter } from "react-icons/go";

// import MobileProductFilter from "../../Filters/mobile-product-filter";
// import NavbarScrollingBanner from "../../NavBar/components/navbar-scrolling-banner";
// import { MdArrowBackIos } from "react-icons/md";
// import RangeSlider from "../../Filters/range-slider";
// import MobileProductExcludeFilter from "@/components/Filters/mobile-product-exclude-filter";
// import getSizes from "@/actions/get-sizes";
// import getColors from "@/actions/get-colors";
// import getMaterials from "@/actions/get-materials";
// import getSubcategories from "@/actions/get-sub-categories";

// interface FilterModalProps {
//   designers?: Designer[];
//   categories?: Category[];
//   sellers?: Seller[];
//   conditions?: Condition[];
//   genders?: Gender[];
// }

// const FilterModal: React.FC<FilterModalProps> = ({
// }) => {
//   const [open, setOpen] = React.useState(false);

//   const [sizes, setSizes] = useState<Size[] | undefined>(undefined);
//   const [isLoadingSizes, setIsLoadingSizes] = useState(true);

//   const [colors, setColors] = useState<Color[] | undefined>(undefined);
//   const [isLoadingColors, setIsLoadingColors] = useState(true);

//   const [materials, setMaterial] = useState<Material[] | undefined>(undefined);
//   const [isLoadingMaterial, setIsLoadingMaterial] = useState(true);

//   const [subcategories, setSubcategory] = useState<Subcategory[] | undefined>(undefined);
//   const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(true);

//   const openDrawer = () => setOpen(true);
//   const closeDrawer = () => setOpen(false);
//   const sortAlphabetically = (data: any[] | undefined) => {
//     return data?.sort((a, b) => a.name.localeCompare(b.name)) || [];
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoadingSizes(true);
//         const sizesData = await getSizes(`${process.env.NEXT_PUBLIC_STORE_ID}`);
//         setSizes(sizesData);
//         setIsLoadingSizes(false);

//         setIsLoadingColors(true);
//         const colorData = await getColors(
//           `${process.env.NEXT_PUBLIC_STORE_ID}`
//         );
//         setColors(colorData);
//         setIsLoadingColors(false);

//         setIsLoadingMaterial(true);
//         const materialData = await getMaterials(
//           `${process.env.NEXT_PUBLIC_STORE_ID}`
//         );
//         setMaterial(materialData);
//         setIsLoadingMaterial(false);

//         setIsLoadingSubcategories(true);
//         const subcategoryData = await getSubcategories(
//           `${process.env.NEXT_PUBLIC_STORE_ID}`
//         );
//         setSubcategory(subcategoryData);
//         setIsLoadingSubcategories(false);
//       } catch (error) {
//         console.error("Failed to fetch gender data:", error);
//         setIsLoadingSizes(false);
//         setIsLoadingColors(false);
//       }
//     };

//     if (process.env.NEXT_PUBLIC_STORE_ID) {
//       fetchData();
//     }
//   }, []);

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
//         className=" bg-white  "
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

//           <div className="flex flex-col row-span-1 justify-center items-center h-1/3 w-full"></div>
//           <div className="row-span-4 p-4 overflow-y-auto h-full flex-row justify-center items-center shadow-2xl rounded-md border w-full">
//             <div className="flex flex-row text-sm w-full items-center justify-center p-2 mb-2">
//               <h2>Set filters to find the perfect product for you</h2>
//             </div>
//             <div className="flex flex-col h-full w-full justify-start items-start overflow-y-auto gap-2">
//               {isLoadingSizes ? (
//                 <div className="w-full justify-center text-center text-super-small text-muted-foreground">
//                   Loading...
//                 </div>
//               ) : (
//                 <div className="flex flex-col bg-white w-full justify-center items-center">
//                   <MobileProductFilter
//                     valueKey="sizeId"
//                     name="Sizes"
//                     data={sortAlphabetically(sizes || [])}
//                   />
//                 </div>
//               )}

//               {isLoadingColors ? (
//                 <div className="w-full justify-center text-center text-super-small text-muted-foreground">
//                   Loading...
//                 </div>
//               ) : (
//                 <div className="flex flex-col bg-white w-full justify-center items-center">
//                   <MobileProductFilter
//                     valueKey="colorId"
//                     name="Colors"
//                     data={sortAlphabetically(colors || [])}
//                   />
//                 </div>
//               )}

//               {isLoadingMaterial ? (
//                 <div className="w-full justify-center text-center text-super-small text-muted-foreground">
//                   Loading...
//                 </div>
//               ) : (
//                 <div className="flex flex-col bg-white w-full justify-center items-center">
//                   <MobileProductFilter
//                     valueKey="materialId"
//                     name="Materials"
//                     data={sortAlphabetically(materials)}
//                   />
//                 </div>
//               )}

//               {isLoadingSubcategories ? (
//                 <div className="w-full justify-center text-center text-super-small text-muted-foreground">
//                   Loading...
//                 </div>
//               ) : (
//                 <div className="flex flex-col bg-white w-full justify-center items-center">
//                   <MobileProductFilter
//                   valueKey="subcategoryId"
//                   name="Sub-Category"
//                   data={sortAlphabetically(subcategories)}
//                 />
//                 </div>
//               )}

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
