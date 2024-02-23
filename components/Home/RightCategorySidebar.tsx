'use client'

import React, { useEffect, useState } from 'react';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category, Designer, Seller  } from '@/types';
import { useParams } from 'next/navigation';


interface RightSideProps {
    data: Category[];
    title?: string;
    // store: Store[];
  }

  

  
  const RightCategorySidebar: React.FC<RightSideProps> = ({ data, title }) => {
      const params = useParams();
      const pathname = usePathname();

    //   console.log(store);
    return (
        <aside className="flex flex-col w-1/6 text-right p-3 justify-start items-end">
            <Link className='hover:underline' href={`/categories`}>{title}</Link>
            {data.map((category, index) => (
                    <Link href={`/categories/${category.id}`} key={category.name}>
                    <p
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                            pathname === `/categories/${category.id}` ? "text-stone" : "text-stone-500"
                            )}
                            >
                        {category.name}
                    </p>
                    </Link>
                ))}
        </aside>
    );
}

export default RightCategorySidebar;
