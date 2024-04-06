"use client";

import Link from "next/link";

import SecondNavBarContainer from "./Containers/SecondNavBarContainer";
import FirstNavBarContainer from "./Containers/FirstNavBarContainer";
import MegaSearch from "../Search/mega-search";
import ShoppingCartButton from "./buttons/ShoppingCartButton";
import HeartButton from "./buttons/HeartButton";
import HamburgerMenu from "./hamburger-menu";
import ClientAdvisor from "../ui/ClientAdvisor";
import Container from "../ui/Container";
import BannerBillboard from "../Billboard/BannerBillboard";
import { Input } from "../ui/input";

import {
  Billboard,
  Category,
  Color,
  Condition,
  Designer,
  Gender,
  Material,
  Product,
  Seller,
  Size,
  Subcategory,
} from "@/types";


interface NavbarProps {
  sellers: Seller[];
  designers: Designer[];
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  materials: Material[];
  conditions: Condition[];
  genders: Gender[];
  subcategories: Subcategory[];
  products: Product[];
  navBarBillboard: Billboard;
}

const Navbar: React.FC<NavbarProps> = ({
  sellers,
  designers,
  categories,
  sizes,
  colors,
  materials,
  conditions,
  genders,
  subcategories,
  products,
  navBarBillboard,
}) => {
  return (
    <>
      <BannerBillboard
        //@ts-ignore
        data={navBarBillboard}
      />

      {/* // Split into two Navbar row with 1/3 columns */}
      <div className="border-b sticky bg-white w-full top-0 z-40">
        <Container>
          <FirstNavBarContainer>
            {/* Search Filters */}
            <div className="flex flex-row w-1/3 justify-start gap-4">
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
                icon={
                  <Input
                    className="bg-white z-40 w-full hover:cursor-pointer "
                    placeholder="Search store..."
                  />
                }
              />
              <HamburgerMenu 
                 designers={designers}
                 categories={categories}
                 sellers={sellers}
                />
              <ClientAdvisor products={products} />
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
