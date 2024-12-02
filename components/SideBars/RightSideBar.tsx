"use client";

import React, { useEffect, useState } from "react";

import {
  Color,
  Condition,
  Designer,
  Material,
  Product,
  Seller,
  Size,
  Subcategory,
} from "@/types";
import { randomiseData } from "../../utils/sortdata";
import MiniProductCard from "../Product/mini-product-card";
import MobileProductFilter from "../Filters/mobile-product-filter";
import RangeSlider from "../Filters/range-slider";

interface RightSideProps {
  sizes?: Size[];
  colors?: Color[];
  conditions?: Condition[];
  materials?: Material[];
  subcategories?: Subcategory[];
  productData?: Product[];
  designers?: Designer[];
  sellers?: Seller[];
  miniProductTitle?: string;
}

const RightSidebar: React.FC<RightSideProps> = ({
  sizes,
  colors,
  materials,
  subcategories,
  productData,
  miniProductTitle,
}) => {
  const [randomisedProductData, setRandomisedProductData] = useState(
    productData!
  );

  useEffect(() => {
    setRandomisedProductData(randomiseData(productData));
  }, [productData]);

  const sortAlphabetically = (data: any[] | undefined) => {
    return data?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  };

  return (
    <aside className="h-full mr-5 p-1">
      <div className="grid grid-rows-4 h-full w-full justify-start items-start flex-col">

        <div className="row-span-3 h-full w-full justify-start items-center">
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
          <div className="flex flex-col bg-white w-full justify-center items-center ">
            <MobileProductFilter
              valueKey="subcategoryId"
              name="Sub-Category"
              data={sortAlphabetically(subcategories)}
            />
          </div>
        </div>

        <div className="flex flex-col row-span-1 justify-start items-center">
          <RangeSlider />
        </div>

        {/* <div className="flex flex-col bg-white row-span-2 h-full w-full ">
          {randomisedProductData?.length > 0 ? (
            <MiniProductCard
              miniProductTitle={miniProductTitle}
              miniProductRoute="/featured"
              data={randomisedProductData}
            />
          ) : null}
        </div> */}
      </div>
    </aside>
  );
};

export default RightSidebar;

// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Color,
//   Condition,
//   Designer,
//   Material,
//   Product,
//   Seller,
//   Size,
//   Subcategory,
// } from "@/types";
// import { randomiseData } from "@/utils/sortdata";
// import RangeSlider from "@/components/Filters/range-slider";
// import FilterGroup from "@/components/Filters/filter-group";

// interface RightSidebarProps {
//   sizes?: Size[];
//   colors?: Color[];
//   conditions?: Condition[];
//   materials?: Material[];
//   subcategories?: Subcategory[];
//   productData?: Product[];
//   designers?: Designer[];
//   sellers?: Seller[];
//   miniProductTitle?: string;
// }

// const RightSidebar: React.FC<RightSidebarProps> = ({
//   sizes,
//   colors,
//   materials,
//   subcategories,
//   productData,
// }) => {
//   const [randomisedProductData, setRandomisedProductData] = useState(
//     productData || []
//   );

//   useEffect(() => {
//     setRandomisedProductData(randomiseData(productData));
//   }, [productData]);

//   const sortAlphabetically = (data: any[] | undefined) => {
//     return data?.sort((a, b) => a.name.localeCompare(b.name)) || [];
//   };

//   return (
//     <aside className="h-full z-35 mr-5 p-1">
//       <div className="grid grid-rows-4 h-full w-full justify-end items-end flex-col">

//       <div className="flex flex-col row-span-1 justify-start items-center h-full w-full">
//           <RangeSlider />
//         </div>
//         <div className="row-span-3 h-full w-full">
//           <FilterGroup
//             title="Sizes"
//             data={sortAlphabetically(sizes)}
//             valueKey="sizeId"
//           />
//           <FilterGroup
//             title="Colors"
//             data={sortAlphabetically(colors)}
//             valueKey="colorId"
//           />
//           <FilterGroup
//             title="Materials"
//             data={sortAlphabetically(materials)}
//             valueKey="materialId"
//           />
//           <FilterGroup
//             title="Sub-categories"
//             data={sortAlphabetically(subcategories)}
//             valueKey="subcategoryId"
//           />
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default RightSidebar;
