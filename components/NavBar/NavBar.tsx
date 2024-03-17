import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";

// import { Input } from '@chakra-ui/react'
import { Input } from "@/components/ui/input";

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
  const products = await getProducts({ all: true });
  const advertismentBillboard = await getBillboardByName("OnSale");

  // const addvertismentBillboard = await getBillboard('30313316-d9de-4cdb-a9c9-b40708854042');

  return (
    <>
      <BannerBillboard
        //@ts-ignore
        data={advertismentBillboard}
      />

      {/* // Split into two Navbar row with 1/3 columns */}
      <div className="border-b bg-white w-full top-0 z-50">
        {/* <div className="flex flex-col items-center w-full"> */}
          <Container>
          <FirstNavBarContainer>
            {/* Search Filters */}
            <div className="flex flex-row w-1/3 justify-start">
              <div className="flex flex-col items-start justify-start w-full">
                <MobileFilters
                  sellers={sellers}
                  designers={designers}
                  categories={categories}
                  sizes={sizes}
                  colors={colors}
                  products={products}
                />
              </div>
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

          <SecondNavBarContainer>
            {/* <div className="flex w-1/3"></div> */}
            {/* Nav dropdowns */}
            <div className="flex flex-col w-full justify-center items-center">
              <div className="flex flex-col items-center justify-center w-full ">
                {/* <MobileFilters 
                                sellers={sellers}
                                designers={designers}
                                categories={categories}
                                sizes={sizes}
                                colors={colors}
                                products={products}
                            /> */}
                {/* Quick links that redirect to pages */}
                <div className="flex items-center text-center w-2/3 text-xs md:text-sm text-stone-700 gap-2 justify-between">
                  <Link href={`/top-likes`}>
                    <p className=" items-center text-center hover:text-stone-900 hover:underline hover:cursor-pointer">
                      Top liked
                    </p>
                  </Link>
                  <Link href={`/most-viewed`}>
                    <p className="items-center text-center hover:text-stone-900 hover:underline hover:cursor-pointer">
                      Trending
                    </p>
                  </Link>
                  <Link href={`/for-you`}>
                    <p className="items-center text-center hover:text-stone-900 hover:underline hover:cursor-pointer">
                      For you
                    </p>
                  </Link>
                  <Link href={`/`}>
                    <p className="items-center text-center hover:text-stone-900 hover:underline hover:cursor-pointer">
                      New arrivals
                    </p>
                  </Link>
                  <Link href={`/sale`}>
                    <p className="items-center text-center hover:text-stone-900 hover:underline hover:cursor-pointer">
                      Sale
                    </p>
                  </Link>
                </div>
                {/* <DesignerNav data={designers} />
                        <CategoryNav data={categories} />
                        <SellerNav data={sellers} /> */}
              </div>
            </div>
            {/* Empty w-1/3 div */}
            {/* <div className="flex w-1/3"></div> */}
          </SecondNavBarContainer>
          </Container>
        {/* </div> */}
      </div>
    </>
  );
};

export default Navbar;
