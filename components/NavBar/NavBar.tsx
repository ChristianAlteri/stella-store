import Link from "next/link";
import Container from "../ui/Container";

import { Input } from '@chakra-ui/react'


import { CiHeart, CiShoppingCart } from "react-icons/ci";


import SecondNavBarContainer from "./SecondNavBarContainer";
import FirstNavBarContainer from "./FirstNavBarContainer";

import CategoryNav from "./main-category-nav";
import DesignerNav from "./main-designer-nav";
import SellerNav from "./main-seller-nav";

import getCategories from "@/actions/get-categories";
import getDesigners from "@/actions/get-designers";
import getSellers from "@/actions/get-sellers";


const Navbar = async () => {
        const sellers = await getSellers();
        const designers = await getDesigners();
        const categories = await getCategories();
       
  console.log(sellers);

  return ( 
    <div className="border-b">
      <Container>
        <FirstNavBarContainer
        >
            <div className="flex ">
            <Link href="/" className="flex justify-start p-3 lg:ml-0 gap-x-2">
                <p className="font-semibold text-xl">LOGO</p>
                </Link>
                <div className="flex justify-between p-3 lg:ml-0 gap-x-2" style={{ width: '100px' }}>
                    <Link href="/womens" className=" lg:ml-0 gap-x-2">
                        <p className="hover:underline text-stone-700 hover:text-stone-900 hover:cursor-pointer">womens</p>
                    </Link>
                    <Link href="/mens" className=" lg:ml-0 gap-x-2">
                        <p className="hover:underline text-stone-700 hover:text-stone-900 hover:cursor-pointer">mens</p>
                    </Link>
                </div>
            </div>
            
            <Input className="bg-secondary border-b" htmlSize={27} placeholder='Search store' />
                <div className="flex flex-row gap-4">
                    <CiHeart size={"20px"} className="hover:cursor-pointer"/>
                    <CiShoppingCart size={"20px"} className="hover:cursor-pointer"/>
                </div>
        </FirstNavBarContainer>
        <SecondNavBarContainer >
            <div className="justify-between w-1/3 text-sm text-stone-700 rounded-md p-2 font-medium transition-colors hover:text-stone-900 hover:bg-secondary hover:underline hover:cursor-pointer">
                filters
            </div>
            <div className="flex items-center ml-4 justify-between w-1/3">
            <CategoryNav data={categories} />
            <DesignerNav data={designers} />
            <SellerNav data={sellers} />
            </div>
        </SecondNavBarContainer>
      </Container>
    </div>
  );
};
 
export default Navbar;