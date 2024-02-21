'use client'

import React, { useEffect, useState } from 'react';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category, Designer, Seller  } from '@/types';
import { useParams } from 'next/navigation';


interface RightSideProps {
    data: Seller[];
    // store: Store[];
  }

  
  const RightSidebar: React.FC<RightSideProps> = ({ data }) => {
    const params = useParams();
    const pathname = usePathname();
    //   console.log(store);
    return (
        <aside className="flex flex-col w-1/6 text-right p-3 justify-start items-end">
            <Link className='hover:underline' href={`/sellers`}>Sellers</Link>
            {data.map((seller, index) => (
                    <Link href={`/sellers/${seller.instagramHandle}`}>
                    <p
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                            pathname === `/seller/${seller.instagramHandle}` ? "text-stone" : "text-stone-500"
                            )}
                            >
                        {seller.instagramHandle.split('@')[1].toUpperCase()}
                    </p>
                    </Link>
                ))}
        </aside>
    );
}

export default RightSidebar;
