import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterGroupProps {
  title: string;
  data: any[];
  valueKey: string;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ title, data, valueKey }) => {
  return (
    <div className="row-span-3 h-full w-full">
      <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      <div className="space-y-1">
        {data.map((item) => (
          <div key={item.id} className="flex items-center">
            <Checkbox id={`${valueKey}-${item.id}`} />
            <Label
              htmlFor={`${valueKey}-${item.id}`}
              className="ml-2 text-sm text-gray-600"
            >
              {item.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterGroup;

