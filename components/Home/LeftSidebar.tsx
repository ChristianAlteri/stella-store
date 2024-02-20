'use client'

import React from 'react';

import { Designer  } from '@/types';
import { useParams }from 'next/navigation';


interface LeftSideProps {
    data: Designer[];
    // store: Store[];
  }

  
  const LeftSidebar: React.FC<LeftSideProps> = ({ data }) => {

    const params = useParams();
    //   console.log(store);
    return (
            <aside className="flex flex-col w-1/6 text-left p-3 justify-start items-start">
                Designers
                {data.map((designer, index) => (
                    <div key={designer.id} className='flex flex-row text-sm text-stone-700 hover:text-stone-900'>
                        <a className="hover:underline" 
                        href={`${process.env.NEXT_PUBLIC_API_URL}/designer/${designer.id}`}>
                            {designer.name}
                        </a>
                    </div>
                ))}
            </aside>
    );
}

export default LeftSidebar;
