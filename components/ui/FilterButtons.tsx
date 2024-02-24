'use client'

import { cn } from "@/lib/utils";
import { Category, Color, Designer, Seller, Size } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import qs from 'query-string'
import Button from "./button";


interface FilterButtonsProps {
   data: (Size | Color | Designer | Seller | Category)[];
//    data: (Size | Color | Material | Designer | Seller); 
    name: string;
    valueKey: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
    data,
    name,
    valueKey
}) => {

    const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);
  
  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, { skipNull: true });

    router.push(url);
 }


    return ( 
      <div className="flex flex-row items-start justify-start text-start">
        <div className="flex w-full flex-row items-center gap-4 ">
          <h3 className="text-xs hover:underline hover:cursor-pointer">
            {name}
          </h3>
          
          <div className="flex flex-row w-full overflow-x-auto gap-2 ">
            {data.map((filter) => (
              <div key={filter.id} className="flex flex-row items-center">
                <Button
                  className={cn(
                    'rounded-md flex flex-row justify-center items-center text-center text-xs text-stone-500 p-2 bg-white border border-stone-300',
                    selectedValue === filter.id && 'bg-black text-white'
                  )}
                  onClick={() => onClick(filter.id)}
                >
                  {filter.name}
                </Button>
              </div>
            ))}
        </div>
        </div>
    </div>
  );
};

 
export default FilterButtons;