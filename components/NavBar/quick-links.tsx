'use client';

import Link from "next/link";

import { CiCoinInsert, CiHeart } from "react-icons/ci";
import { IoMdTrendingUp } from "react-icons/io";
import { TbPlaneArrival } from "react-icons/tb";
import { RiHome5Line } from "react-icons/ri";

const QuickLinks = () => {
    return ( 
        <>
            <Link href="/top-likes" className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline">
            <CiHeart size={20}/>
              Top Liked
            </Link>
            <Link href="/most-viewed" className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline">
              <IoMdTrendingUp size={20}/>
              Trending
            </Link>
            <Link href="/for-you" className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline">
              <RiHome5Line size={20}/>
              For You
            </Link>
            <Link href="/" className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline">
              <TbPlaneArrival size={20}/>
              New Arrivals
            </Link>
            <Link href="/sale" className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline">
            <CiCoinInsert size={20}/>
              Sale
            </Link>
        </>
     );
}
 
export default QuickLinks;