'use client'

import React, { useEffect, useState } from 'react';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category, Designer, Seller  } from '@/types';
import { useParams } from 'next/navigation';


interface RightSideProps {
    data: Seller[];
    title?: string;
    // store: Store[];
  }

  

  
  const RightSidebar: React.FC<RightSideProps> = ({ data, title }) => {
      const params = useParams();
      const pathname = usePathname();

    //   console.log(store);
    return (
        <aside className="flex flex-col w-1/6 text-right p-3 justify-start items-end">
            <Link className='hover:underline' href={`/sellers`}>{title}</Link>
            {data.map((seller, index) => (
                    <Link href={`/sellers/${seller.id}`}  key={seller.name}>
                    <p
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                            pathname === `/sellers/${seller.id}` ? "text-stone" : "text-stone-500"
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
