'use client'

import React, { useEffect, useState } from 'react';

import { Category, Designer  } from '@/types';
import { useParams } from 'next/navigation';


interface RightSideProps {
    data: Category[];
    // store: Store[];
  }

  
  const RightSidebar: React.FC<RightSideProps> = ({ data }) => {
    const params = useParams();
    //   console.log(store);
    return (
        <aside className="flex flex-col w-1/6 text-right p-3 justify-end items-end">
            Sellers
            {data.map((category, index) => (
                <div className='flex flex-row text-sm text-stone-700 hover:text-stone-900 text-right'>
                    <a key={category.id} className="hover:underline" 
                    href={`/api/${params.storeId}/designers/${category.id}`}>
                        {category.name}
                    </a>
                </div>
            ))}
        </aside>
    );
}

export default RightSidebar;
