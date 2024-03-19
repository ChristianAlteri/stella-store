"use client";


import { cn } from "@/lib/utils";
import { Category, Color, Condition, Designer, Material, Seller, Size } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";



interface FilterListProps {
  data: (Size | Color | Designer | Seller | Category | Condition | Material) | undefined;
  name: string;
  valueKey: string;
  onClose?: () => void;
}

const FilterList: React.FC<FilterListProps> = ({ data, name, valueKey, onClose }) => {
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

  const isSelected = selectedValue === data?.id;

  return (
    <>
      <div className="flex flex-col w-full h-full gap-2">
        <div key={data?.id} className="grid items-center">
          <div
            className={cn(
              "flex-row justify-center items-center text-center text-sm p-2 bg-white border rounded-md hover:cursor-pointer hover:underline",
              isSelected ? "bg-emerald-400 text-white" : "text-stone-500"
            )}
            onClick={() => onClick(data?.id)}
          >
            {data?.name}
          </div>
        </div>
      </div>
    </>
  );
};


export default FilterList;
