"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
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
      <Button onClick={() => router.push('/likes')} className="flex  flex-row items-center justify-center">
        <span className="p-1 text-super-small text-green-800">
          {likes.items.length}
        </span>
        <CiHeart size={"27px"} className="flex flex-row justify-center absolute hover:cursor-pointer hover:text-stone-900 hover:underline" />
      </Button>
    </div>
  );
}
 
export default HeartButton;