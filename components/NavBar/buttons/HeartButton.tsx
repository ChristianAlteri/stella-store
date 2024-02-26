"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import useLike from "@/hooks/use-like";


const HeartButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const likes = useLike();

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="">
      <Button onClick={() => router.push('/likes')} className="flex ">
      <CiHeart size={"20px"} className="hover:cursor-pointer hover:text-stone-900 hover:underline"/>
        <span className="p-1 text-xs text-green-800">
          {likes.items.length}
        </span>
      </Button>
    </div>
  );
}
 
export default HeartButton;