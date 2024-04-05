import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";

// import { Input } from '@chakra-ui/react'

import SecondNavBarContainer from "./Containers/SecondNavBarContainer";
import FirstNavBarContainer from "./Containers/FirstNavBarContainer";

import getCategories from "@/actions/get-categories";
import getDesigners from "@/actions/get-designers";
import getSellers from "@/actions/get-sellers";
import ShoppingCartButton from "./buttons/ShoppingCartButton";
import HeartButton from "./buttons/HeartButton";
import { Input } from "../ui/input";

import MegaSearch from "../Search/mega-search";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getBillboardByName from "@/actions/get-billboard-by-name";
import BannerBillboard from "../Billboard/BannerBillboard";
import getProducts from "@/actions/get-products";
import getMaterials from "@/actions/get-materials";
import getConditions from "@/actions/get-conditions";

import { CiMenuBurger } from "react-icons/ci";
import ClientAdvisor from "../ui/ClientAdvisor";
import getGenders from "@/actions/get-genders";
import getSubcategories from "@/actions/get-sub-categories";

const Navbar = async () => {
  const sellers = await getSellers();
  const designers = await getDesigners();
  const categories = await getCategories();
  const sizes = await getSizes();
  const colors = await getColors();
  const materials = await getMaterials();
  const conditions = await getConditions();
  const genders = await getGenders();
  const subcategories = await getSubcategories();
  const products = await getProducts({ all: true });
  const advertismentBillboard = await getBillboardByName("OnSale");


  return (
    <>
      <BannerBillboard
        //@ts-ignore
        data={advertismentBillboard}
      />

      {/* // Split into two Navbar row with 1/3 columns */}
      <div className="border-b sticky bg-white w-full top-0 z-40">
          <Container>
          <FirstNavBarContainer>
            {/* Search Filters */}
            <div className="flex flex-row w-1/3 justify-start gap-4">
                <div className="flex hover:underline hover:cursor-pointer hover:text-stone-900 transition z-40 text-xs items-center ">
                  <CiMenuBurger size={17} className="md:hidden flex flex-row justify-center" />
                </div>
                <MegaSearch
                  sellers={sellers}
                  designers={designers}
                  categories={categories}
                  sizes={sizes}
                  colors={colors}
                  products={products}
                  materials={materials}
                  conditions={conditions}
                  genders={genders}
                  subcategories={subcategories}
                  icon={<Input className="bg-white z-40 w-full hover:cursor-pointer " placeholder='Search store...' />}
                />
                <ClientAdvisor 
                  products={products}
                />
            </div>
            {/* Logo */}
            <Link href="/" className="flex">
              <p className="font-bold text-xl">@ANONDROBE</p>
            </Link>

            {/* Cart */}
            <div className="flex flex-row gap-2 w-1/3 justify-end">
              <HeartButton />
              <ShoppingCartButton />
            </div>
          </FirstNavBarContainer>

          <SecondNavBarContainer>
            {/* Nav dropdowns */}
            <div className="flex flex-col w-full justify-center items-center">
              <div className="flex flex-col items-center justify-center w-full ">
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
              </div>
            </div>
          </SecondNavBarContainer>
          </Container>
      </div>
    </>
  );
};

export default Navbar;
