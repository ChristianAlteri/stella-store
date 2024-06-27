"use client";

import Link from "next/link";

import MegaSearch from "../Search/mega-search";
import ShoppingCartButton from "./ShoppingCartButton";
import HeartButton from "./HeartButton";
import ProfileButton from "./ProfileButton";
import HamburgerMenu from "./hamburger-menu";
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
import QuickLinks from "./quick-links";
import { useState } from "react";

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
  topTen: Product[];
}

const Navbar: React.FC<NavbarProps> = ({
  sellers,
  designers,
  categories,
  navBarBillboard,
  topTen,
}) => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>
      {/* <BannerBillboard
        //@ts-ignore
        data={navBarBillboard}
      /> */}

      <div className="sticky bg-white w-full top-0 z-40 p-4">
        <div className="grid md:grid-rows-2 grid-rows-1 min-h-[55px] p-1">
          <div className="row-span-1 w-full">
            <div className="flex flex-row w-full">
              <div className="w-full flex flex-row md:justify-start md:items-start justify-center items-center gap-3 p-2">
                <HamburgerMenu
                  designers={designers}
                  categories={categories}
                  sellers={sellers}
                  topTen={topTen}
                />
                {/* <div className="hidden md:flex"> */}
                  <MegaSearch
                    icon={
                      <Input
                        flag="navbar"
                        className="bg-white z-40 w-full hover:cursor-pointer "
                        placeholder="Search store..."
                      />
                    }
                  />
                {/* </div> */}
                {/* <ClientAdvisor products={products} /> */}
              </div>

              <div className="w-full flex flex-row justify-center items-center gap-3 ">
                <Link href="/" className="flex">
                  <h1 className="font-bold text-2xl md:text-4xl">@</h1>
                  <h1 className="font-bold text-2xl md:text-4xl">NONDROBE</h1>
                </Link>
              </div>

              <div className="w-full flex flex-row justify-end items-center gap-4 md:gap-8 p-2">
                <HeartButton />
                <ShoppingCartButton size="27px" />
                {loggedIn ? <ProfileButton /> : null}
              </div>
            </div>
          </div>

          <div className="row-span-1 w-full md:flex hidden mt-2">
            <div className="flex-col w-full justify-center items-center ">
              <div className="flex flex-col items-center justify-center w-full ">
                <div className="flex items-center text-center w-1/2 text-xs md:text-sm text-stone-700 gap-2 justify-between">
                  <QuickLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
