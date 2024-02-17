import Link from "next/link";
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
    <div className="border-b">
      <Container>
        <FirstNavBarContainer
        >
            <div className="flex w-1/3">

            {/* Logo */}
            <Link href="/" className="flex justify-start gap-4 lg:ml-0 ">
                <p className="font-semibold text-xl">LOGO</p>
                </Link>
                {/* Mens/Womens */}
                <div className="flex justify-between p-3 lg:ml-0 gap-x-2" style={{ width: '100px' }}>
                    <Link href="/womens" className=" lg:ml-0 gap-x-2">
                        <p className="hover:underline text-stone-700 hover:text-stone-900 hover:cursor-pointer">womens</p>
                    </Link>
                    <Link href="/mens" className=" lg:ml-0 gap-x-2">
                        <p className="hover:underline text-stone-700 hover:text-stone-900 hover:cursor-pointer">mens</p>
                    </Link>

                </div>
            </div>
            {/* Search Bar */}
            <Input className="bg-secondary" placeholder='Search store' />
                {/* Cart */}
                <div className="flex flex-row p-4 gap-4 w-1/3 justify-end">
                    
                    <HeartButton />
                    <ShoppingCartButton />

                </div>
        </FirstNavBarContainer>
        
        <SecondNavBarContainer >
            {/* Filters */}
            <div className="justify-between w-1/3 text-sm text-stone-700 rounded-md gap-4 font-medium transition-colors hover:text-stone-900 hover:bg-secondary hover:underline hover:cursor-pointer">
                filters
            </div>
            {/* Nav dropdowns */}
            <div className="flex items-center ml-4 justify-between w-1/3">
            <CategoryNav data={categories} />
            <DesignerNav data={designers} />
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