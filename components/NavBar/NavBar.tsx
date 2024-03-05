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

import MobileFilters from "../ui/MobileFilters";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getBillboardByName from "@/actions/get-billboard-by-name";
import BannerBillboard from "../Billboard/BannerBillboard";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";


const Navbar = async () => {
        const sellers = await getSellers();
        const designers = await getDesigners();
        const categories = await getCategories();
        const sizes = await getSizes();
        const colors = await getColors();
        const products = await getProducts({all: true});
        const advertismentBillboard = await getBillboardByName('OnSale'); 

        // const addvertismentBillboard = await getBillboard('30313316-d9de-4cdb-a9c9-b40708854042');
       


  return ( 
      <>
        <BannerBillboard 
        //@ts-ignore
        data={advertismentBillboard} 
        />

      {/* // Split into two Navbar row with 1/3 columns */}
        <div className="border-b bg-white sticky top-0 z-20">
        <Container>
            <FirstNavBarContainer>
                {/* Search Filters */}
                <div className="flex justify-between w-1/3 text-sm text-stone-700 rounded-md gap-2 font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer">
                    <MobileFilters 
                        sellers={sellers}
                        designers={designers}
                        categories={categories}
                        sizes={sizes}
                        colors={colors}
                        products={products}
                    />
                </div>
                {/* Logo */}
                <Link href="/" className="flex">
                    <p className="font-bold text-xl">@ANONDROBE</p>
                    {/* <div className="flex">
                        <Image
                        alt="logo"
                        height="30"
                        width="230"
                        // fill
                        className=""
                        src="/images/jpegspray.jpeg"
                        />
                    </div> */}
                </Link>
                
                {/* Cart */}
                <div className="flex flex-row gap-2 w-1/3 justify-end">
                    <HeartButton />
                    <ShoppingCartButton />
                </div>
            </FirstNavBarContainer>
            

            <SecondNavBarContainer >
                {/* <div className="flex w-1/3"></div> */}
                {/* Nav dropdowns */}
                <div className="flex flex-col w-2/3 justify-center items-center">
                    <div className="flex items-center justify-between w-2/3 ">
                        <DesignerNav data={designers} />
                        <CategoryNav data={categories} />
                        <SellerNav data={sellers} />
                    </div>
                </div>
                {/* Empty w-1/3 div */}
                {/* <div className="flex w-1/3"></div> */}
            </SecondNavBarContainer>
        </Container>
        </div>
        
    </>
  );
};
 
export default Navbar;