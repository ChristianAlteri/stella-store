"use client";

import { Category, Designer, Seller } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  data: Category | Designer | Seller;
  route: string;
  id: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data, route }) => {
  return (
    <div className="col-span-1 relative p-6 rounded-sm overflow-hidden hover:cursor-pointer">
      <Link href={`/${route}/${data?.id}`}>
        <p className="text-xl font-bold absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {(data as Seller).instagramHandle ? (data as Seller).instagramHandle : data?.name}
        </p>
        {data?.billboard?.imageUrl.match(
          /https:\/\/.*\.(video|mp4|MP4|mov).*/
        ) ? (
          <video
            key={data.billboard.id}
            muted
            autoPlay
            loop
            width={700}
            src={`${data?.billboard?.imageUrl}`}
            className="flex justify-center items-center rounded-xl overflow-hidden bg-cover"
          ></video>
        ) : (
          <Image
            key={data.billboard.id}
            height={0}
            width={700}
            src={data?.billboard?.imageUrl}
            alt={data?.name}
            className="rounded-md w-full h-full object-cover"
          />
        )}
      </Link>
    </div>
  );
};

export default CategoryCard;