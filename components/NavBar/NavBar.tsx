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
import { MenuItem } from "@chakra-ui/react";
import MobileFilters from "../ui/MobileFilters";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";


const Navbar = async () => {
        const sellers = await getSellers();
        const designers = await getDesigners();
        const categories = await getCategories();
        const sizes = await getSizes();
        const colors = await getColors();
       
//   console.log(sellers);

  return ( 
    // Split into two Navbar row with 1/3 columns
    <div className="border-b bg-white sticky top-0 z-20">
      <Container>
        <FirstNavBarContainer
        >
            <div className="flex w-1/3">
            <div className="flex w-1/3"></div>
            {/* Filters */}
            <div className="justify-between w-1/3 text-sm text-stone-700 rounded-md gap-4 font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer">
                {/* filters/ topLiked, mostViewed, newArrivals, sale */}
                <MobileFilters 
                    sellers={sellers}
                    designers={designers}
                    categories={categories}
                    sizes={sizes}
                    colors={colors}
                />
                <div className="flex gap-3" >
            </div>
            </div>
            </div>
            {/* Logo */}
            <Link href="/" className="flex justify-start lg:ml-0 ">
                {/* <p className="font-semibold text-xl">LOGO</p> */}
                <div className="flex">
                    <Image
                    alt="logo"
                    height="30"
                    width="230"
                    // fill
                    className=""
                    src="/images/jpegspray.jpeg"
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