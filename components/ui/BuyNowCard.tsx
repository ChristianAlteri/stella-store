'use client'

import { Product } from "@/types";
import React from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import ProductCardButton from "./ProductCardButton";

interface BuyNowCardProps {
    data: Product;
}

const BuyNowCard: React.FC<BuyNowCardProps> = ({
    data
}) => {


    const descriptionElements = data.description.split("- ").map((item, index) => (
        <React.Fragment key={index}>
            {index > 0 && <React.Fragment><br /></React.Fragment>} 
            {item}
        </React.Fragment>
        ));

    return ( 
        <div className="flex flex-col gap-3 p-5 w-full">
            <div className="flex flex-row gap-1">
                <h1 className="text-xs text-red-500">£{data.ourPrice}</h1>
                <h1 className="text-xs ">from</h1>
                <h1 className="text-xs ">£{data.retailPrice}</h1>
            </div>
                <h1 className="flex text-xs  text-stone-300">Shipping included</h1>
                <div className="flex flex-col justify-center items-center text-center">
                    <h1 className="flex text-xs">{data.likes! < 7 ? '7' : data.likes} people liked this</h1>
                    <h1 className="flex text-xs">{data.clicks! < 34 ? '34' : data.clicks} are interested</h1>
                </div>
                <div className="flex flex-row items-center ">
                    <button className="bg-stone-900  rounded-sm text-white p-2 w-2/3">Buy Now</button>
                    {/* <div className="w-1/3 "><CiHeart/></div> */}
                    <div className="w-1/3 flex flex-col justify-center items-center text-center gap-1">
                        <ProductCardButton 
                            icon={<CiHeart/>}
                            onClick={() => {console.log('add this to my likes')}}
                        />
                        <ProductCardButton 
                            icon={<CiShare2/>}
                            onClick={() => {console.log('Share')}}
                        />
                    </div>
                </div>
        </div>
     );
    }
    
    export default BuyNowCard;
