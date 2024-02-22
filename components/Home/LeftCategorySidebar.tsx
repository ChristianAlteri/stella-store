'use client'

import React from 'react';

import { cn } from "@/lib/utils";

import { Category, Designer  } from '@/types';
import { useParams }from 'next/navigation';

import Link from "next/link";
import { usePathname } from "next/navigation";


interface LeftSideProps {
    data: Category[];
    title?: string;
    // store: Store[];
  }

  
  const LeftCategorySidebar: React.FC<LeftSideProps> = ({ data, title }) => {
    const pathname = usePathname();
    const params = useParams();
    //   console.log(store);
    return (
            <aside className="flex flex-col w-1/6 text-left p-3 justify-start items-start">
                <Link className='hover:underline' href={`/categories`}>{title}</Link>
                {data.map((data, index) => (
                    <Link href={`/categories/${data.name}`} key={data.name}>
                    <p
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                            pathname === `/categories/${data.name}` ? "text-stone" : "text-stone-500"
                            )}
                            >
                        {data.name}
                    </p>
                    </Link>
                ))}
                {/* {data.map((designer, index) => (
                    <div key={designer.id} className='flex flex-row text-sm text-stone-700 hover:text-stone-900'>
                        <a className="hover:underline" 
                        href={`${process.env.NEXT_PUBLIC_API_URL}/designer/${designer.id}`}>
                            {designer.name}
                        </a>
                    </div>
                ))} */}
            </aside>
    );
}

export default LeftCategorySidebar;
