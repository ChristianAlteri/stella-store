"use client";

import { cn } from "@/lib/utils";
import {
  Category,
  Color,
  Condition,
  Designer,
  Gender,
  Material,
  Seller,
  Size,
  Subcategory,
} from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";

interface ProductFilterProps {
  data:
    | (
        | Size
        | Color
        | Designer
        | Seller
        | Category
        | Condition
        | Material
        | Subcategory
        | Gender
      )[]
    | undefined;
  name: string;
  valueKey: string;
  onClose?: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string | undefined) => {
    const current = qs.parse(searchParams.toString());
    const query = { ...current, [valueKey]: id };
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }
    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipNull: true }
    );
    router.push(url);
  };

  const isSelected = (filterId: string) => selectedValue === filterId;

  return (
    <>
      <div className="flex flex-col underline bg-white justify-start items-start text-lg font-medium">
        <div>{name}</div>
      </div>
      <div className="row-span-1 h-full md:text-xs">
          {data?.map((filterItem) => (
            <div
              key={filterItem.id}>
                <div
                  className={cn(
                    "ml-2 flex justify-start md:text-xs text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                    isSelected(filterItem.id)
                      ? " bg-stella-green p-1 rounded-md flex justify-center items-center text-white transition-transform animate-pulse"
                      : "text-light-font md:text-xs"
                  )}
                  onClick={() => onClick(filterItem?.id)}
                >
                  {filterItem.name}
                </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductFilter;
