'use client'

import { Product } from "@/types";
import React from "react";

interface DetailsCardProps {
    data: Product;
}

const DetailsCard: React.FC<DetailsCardProps> = ({
    data
}) => {


    const descriptionElements = data.description.split("- ").map((item, index) => (
        <React.Fragment key={index}>
            {index > 0 && <React.Fragment><br /></React.Fragment>} 
            {item}
        </React.Fragment>
        ));

    return ( 
        <div className="flex flex-col m-5">
            <div className="m-2">
                <h1 className="text-sm">{data.designer.name.toUpperCase()}</h1>
                <h1 className="text-xs">{data.name}</h1>
            </div>
            <div className="m-2">
                <div className="text-xs">{descriptionElements}</div>
            </div>
            <div className="m-2">
                <h1 className="text-xs">{data.seller.instagramHandle.split("@")[1].toUpperCase()}</h1>
            </div>
        </div>
     );
    }
    
    export default DetailsCard;
