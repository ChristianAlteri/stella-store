'use client'

import { Category, Designer } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
    data: Category | Designer;
    route: string
    id: string;
}


const CategoryCard:React.FC<CategoryCardProps> = ({
    data,
    route
}) => {



    return (
        <div className="relative p-5 rounded-sm overflow-hidden hover:cursor-pointer">
            <Link href={`/${route}/${data?.id}`}>
            {/* <p className="text-xl font-bold absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50 text-stone-900 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"> */}
            <p className="text-xl font-bold absolute top-0 left-0 w-full h-full flex items-center justify-center">
                {data?.name}
            </p>
            <img
                height={900}
                width={500}
                src={data?.billboard?.imageUrl}
                alt={data?.name}
                className="rounded-md w-full h-full object-cover"
            />
            </Link>
        </div>
    );
}
 
export default CategoryCard;