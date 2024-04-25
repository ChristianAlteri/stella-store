"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { CiUser } from "react-icons/ci";
import useLike from "@/hooks/use-like";


const ProfileButton = () => {
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
      <Button onClick={() => router.push('/for-you')} className="flex ">
      <CiUser size={"22px"} className="hover:cursor-pointer hover:text-stone-900 hover:underline"/>
      </Button>
    </div>
  );
}
 
export default ProfileButton;