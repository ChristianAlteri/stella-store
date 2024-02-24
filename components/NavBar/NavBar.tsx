import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";

// import { Input } from '@chakra-ui/react'
import { Input } from "@/components/ui/input"


import { CiHeart, CiShoppingCart } from "react-icons/ci";


import SecondNavBarContainer from "./Containers/SecondNavBarContainer";
import FirstNavBarContainer from "./Containers/FirstNavBarContainer";

import CategoryNav from "./main-category-nav";
import DesignerNav from "./main-designer-nav";
import SellerNav from "./main-seller-nav";

import getCategories from "@/actions/get-categories";
import getDesigners from "@/actions/get-designers";
import getSellers from "@/actions/get-sellers";
import ShoppingCartButton from "./buttons/ShoppingCartButton";
import HeartButton from "./buttons/HeartButton";


const Navbar = async () => {
        const sellers = await getSellers();
        const designers = await getDesigners();
        const categories = await getCategories();
       
//   console.log(sellers);

  return ( 
    // Split into two Navbar row with 1/3 columns
    <div className="border-b sticky top-0">
      <Container>
        <FirstNavBarContainer
        >
            <div className="flex w-1/3">
                {/* Mens/Womens/search */}
                <div className="flex  gap-3" >
                    {/* <Link href="/categories/womens" className=" ">
                        <p className="hover:underline text-stone-700 hover:text-stone-900 hover:cursor-pointer">womens</p>
                    </Link>
                    <Link href="/categories/mens" className=" ">
                        <p className="hover:underline text-stone-700 hover:text-stone-900 hover:cursor-pointer">mens</p>
                    </Link> */}

                {/* Search Bar */}
            <Input className="bg-white" placeholder='Search store' />
            </div>
            </div>
            {/* Logo */}
            <Link href="/" className="flex justify-start gap-4 lg:ml-0 ">
                {/* <p className="font-semibold text-xl">LOGO</p> */}
                <div className="flex mt-4">
                    <Image
                    alt="logo"
                    height="30"
                    width="170"
                    // fill
                    className=""
                    src="/images/spray.png"
                    />
                </div>
            </Link>
            
                {/* Cart */}
                <div className="flex flex-row gap-3 w-1/3 justify-end">
                    
                    <HeartButton />
                    <ShoppingCartButton />

                </div>
        </FirstNavBarContainer>
        
        <SecondNavBarContainer >
            {/* Filters */}
            <div className="justify-between w-1/3 text-sm text-stone-700 rounded-md gap-4 font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer">
                filters
            </div>
            {/* Nav dropdowns */}
            <div className="flex items-center ml-4 justify-between w-1/3">
            <DesignerNav data={designers} />
            <CategoryNav data={categories} />
            <SellerNav data={sellers} />
            </div>
            {/* Empty w-1/3 div */}
            <div className="flex w-1/3"></div>
        </SecondNavBarContainer>
      </Container>
    </div>
  );
};
 
export default Navbar;