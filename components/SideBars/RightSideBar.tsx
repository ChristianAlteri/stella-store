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
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getMaterials from "@/actions/get-materials";
import getSubcategories from "@/actions/get-sub-categories";

interface RightSideProps {}

const resourceFetchers = {
  size: getSizes,
  color: getColors,
  material: getMaterials,
  // subcategory: getSubcategories,
};

const RightSidebar: React.FC<RightSideProps> = ({}) => {
  const [resources, setResources] = useState<Record<string, any[]>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({
    size: true,
    color: true,
    material: true,
    // subcategory: true,
  });

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
    <aside className="h-full mr-5 p-1">
      <div className="grid grid-rows-4 h-full w-full justify-start items-start flex-col">
        <div className="row-span-3 h-full w-full justify-start items-center">
          {["size", "color", "material"].map((key) => (
            <div key={key}>
              {loadingStates[key] ? (
                <div className="w-full justify-center text-center text-super-small text-muted-foreground p-4">
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

        <div className="flex flex-col row-span-1 justify-start items-center">
          <RangeSlider />
        </div>
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
