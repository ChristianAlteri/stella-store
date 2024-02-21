'use client'

import React from 'react';

import { cn } from "@/lib/utils";

import { Designer  } from '@/types';
import { useParams }from 'next/navigation';

import Link from "next/link";
import { usePathname } from "next/navigation";


interface LeftSideProps {
    data: Designer[];
    // store: Store[];
  }

  
  const LeftSidebar: React.FC<LeftSideProps> = ({ data }) => {
    const pathname = usePathname();
    const params = useParams();
    //   console.log(store);
    return (
            <aside className="flex flex-col w-1/6 text-left p-3 justify-start items-start">
                <Link className='hover:underline' href={`/designers`}>Designers</Link>
                {data.map((designer, index) => (
                    <Link href={`/designers/${designer.name}`}>
                    <p
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                            pathname === `/designer/${designer.name}` ? "text-stone" : "text-stone-500"
                            )}
                            >
                        {designer.name}
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

export default LeftSidebar;
