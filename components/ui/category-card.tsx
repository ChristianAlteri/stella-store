"use client";

import { Category, Designer } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  data: Category | Designer;
  route: string;
  id: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data, route }) => {
  return (
    <div className="col-span-1 relative p-10 rounded-sm overflow-hidden hover:cursor-pointer">
      <Link href={`/${route}/${data?.id}`}>
        <p className="text-xl font-bold absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {data?.name}
        </p>
        {data?.billboard?.imageUrl.match(/https:\/\/.*\/image.*/) && (
          <Image
            height={0}
            width={500}
            src={data?.billboard?.imageUrl}
            alt={data?.name}
            className="rounded-md w-full h-full object-cover"
          />
        )}
        {data?.billboard?.imageUrl.match(/https:\/\/.*\.(video|mp4|MP4).*/) && (
          <video
            muted
            autoPlay
            loop
            src={`${data?.billboard?.imageUrl}`}
            className="flex justify-center items-center rounded-xl overflow-hidden bg-cover"
          ></video>
        )}
      </Link>
    </div>
  );
};

export default CategoryCard;
