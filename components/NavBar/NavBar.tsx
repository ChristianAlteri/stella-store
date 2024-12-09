"use client";

import Link from "next/link";

import MegaSearch from "../Search/mega-search";
import ShoppingCartButton from "./components/ShoppingCartButton";
import HeartButton from "./components/HeartButton";
import ProfileButton from "./components/ProfileButton";
import HamburgerMenu from "./components/hamburger-menu";
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
  Store,
  Subcategory,
} from "@/types";
import QuickLinks from "./components/quick-links";
import { useState } from "react";
import IconRedirectButton from "../ui/icon-redirect-button";
import { HiInformationCircle } from "react-icons/hi";
import { useParams } from "next/navigation";

interface NavbarProps {
  store: Store;
  products: Product[];
  // sellers: Seller[];
  // designers: Designer[];
  // categories: Category[];
  // sizes: Size[];
  // colors: Color[];
  // materials: Material[];
  // conditions: Condition[];
  // genders: Gender[];
  // subcategories: Subcategory[];
  // topTen?: Product[];
  // billboard: Billboard | null;
}

const Navbar: React.FC<NavbarProps> = ({
  store,
  products,
  // sellers,
  // designers,
  // categories,
  // topTen,
  // billboard,
}) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const params = useParams();

  return (
    <>
      <div className="sticky bg-white w-full top-0 z-40 p-4">
        <div className="grid md:grid-rows-2 grid-rows-1 min-h-[55px] p-1">
          <div className="row-span-1 w-full">
            <div className="flex flex-row w-full">
              <div className="w-full flex flex-row md:justify-start md:items-start justify-center items-center gap-3 p-2">
                <HamburgerMenu/>
{/* cmon */}
                <MegaSearch
                  icon={
                    <Input
                      flag="navbar"
                      className="bg-white z-50 w-full hover:cursor-pointer "
                      placeholder="Search store..."
                    />
                  }
                />

              </div>

              <div className="w-full flex flex-row justify-center items-center gap-3 ">
                <Link href={`/`} className="flex">
                  <h1 className="font-bold text-2xl md:text-4xl">
                    {store ? store.name : "Loading..."}
                  </h1>
                </Link>
              </div>

              <div className="w-full flex flex-row justify-end items-center gap-4 p-2 z-40">
                <div className="hidden md:flex flex-row gap-2">
                  {/* <IconRedirectButton 
                    route="/about-us"
                    icon="ABOUT"
                  /> */}
                  <IconRedirectButton route="/for-you" icon="REGISTER" />
                </div>
                <HeartButton products={products} />
                <ShoppingCartButton size="28px" products={products} />
                {/* {loggedIn ? <ProfileButton /> : null} */}
                {/* TODO: Finish sign up and sign in */}
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
