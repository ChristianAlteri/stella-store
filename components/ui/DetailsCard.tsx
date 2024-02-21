'use client'

import { Product } from "@/types";
import Link from "next/link";
import React from "react";

interface DetailsCardProps {
    data: Product;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
    data
}) => {


    const descriptionElements = data.description
        .split("- ") // Split the description by the hyphen
        .filter(item => item.trim() !== '') // Remove any empty strings 
        .map((item, index) => (
            <React.Fragment key={index}>
                {index > 0 && <React.Fragment><br /></React.Fragment>} 
               - {item}
            </React.Fragment>
            ));

    return ( 
        <div className="flex flex-col m-5">
            <div className="m-2">
                <Link href={`/designers/${data?.designer?.name}`} className="text-sm hover:underline hover:cursor-pointer">{data?.designer?.name.toUpperCase()} </Link>
                <h1 className="text-xs p-1">{data?.name}</h1>
            </div>
            <div className="m-2">
                    <div className="flex flex-row gap-1">
                        <h1 className="text-xs">Sold By </h1>
                        <Link href={`/sellers/${data?.seller?.instagramHandle}`} className="text-xs hover:underline hover:cursor-pointer"> {data?.seller?.instagramHandle.split("@")[1].toUpperCase()}</Link>
                    </div>
                <div className="p-1">
                    <h1 className="text-xs ">In {data?.condition?.toLocaleLowerCase()} condition</h1>
                    <h1 className="text-xs ">Size {data?.size?.name}</h1>
                </div>
            </div>
            <div className="flex flex-col gap-1 m-2 ">
                <h1 className="text-xs underline">Description </h1>
                    <h1 className="text-xs p-1">{descriptionElements}</h1>
                    <h1 className="text-xs underline">Specs </h1>
                <div className="p-1">
                    <h1 className="text-xs">Material: {data?.material}</h1>
                    <h1 className="text-xs">Measurements: {data?.measurements}</h1>
                    <div className="flex flex-row gap-2">
                        <h1 className="text-xs">Colour: </h1>
                        <div className="h-4 w-4 rounded-sm border border-stone-300" style={{backgroundColor: data?.color?.value}}></div>
                    </div>
                </div>
            </div>
        </div>
     );
    }
    
    export default DetailsCard;
