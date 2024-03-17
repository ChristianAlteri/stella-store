"use client";

import { Category, Color, Designer, Product, Seller, Size } from "@/types";


import FilterList from "../ui/FilterList";


interface SortButtonProps {
  sizes?: Size[];
  colors?: Color[];
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  products?: Product[];
}

const SortButton: React.FC<SortButtonProps> = ({
  sizes,
  colors,
  designers,
  categories,
  sellers,
}) => {

  console.log('right', sellers);

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
          <div className="grid grid-rows-7 gap-7">
            <div className="flex flex-col gap-7 overflow-x-auto w-full ">
              {sellers?.map((seller) => (
                <FilterList
                  key={seller.id}
                  name={seller.instagramHandle}
                  valueKey="sellerId"
                  data={seller}
                />
            ))}
            </div>
          </div>
      </div>
    </>
  );
};

export default SortButton;


/* {designers && (
                <FilterButtons
                  valueKey="designerId"
                  name="Designer"
                  data={designers}
                />
              )}
              {categories && (
                <FilterButtons
                  valueKey="categoryId"
                  name="Category"
                  data={categories}
                />
              )} */

              /* {sellers && (
                <FilterButtons
                  valueKey="sellerId"
                  name="Seller"
                  data={sellers}
                />
              )} */
              /*TODO: Add material and condition  */
              /* {sizes && (
                <FilterButtons valueKey="sizeId" name="Sizes" data={sizes} />
              )}
              {colors && (
                <FilterButtons valueKey="colorId" name="Colors" data={colors} />
              )} */