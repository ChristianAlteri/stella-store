"use client";

import Link from "next/link";

import MegaSearch from "../Search/mega-search";
import ShoppingCartButton from "./components/ShoppingCartButton";
import HeartButton from "./components/HeartButton";
import HamburgerMenu from "./components/hamburger-menu";
import { Input } from "../ui/input";

import { Store } from "@/types";
import QuickLinks from "./components/quick-links";
import { useState } from "react";
import IconRedirectButton from "../ui/icon-redirect-button";
import { useParams } from "next/navigation";
import Image from "next/image";

interface NavbarProps {
  store: Store;
}

const Navbar: React.FC<NavbarProps> = ({ store }) => {
  const [loggedIn, setLoggedIn] = useState(true);
  const params = useParams();

  return (
    <>
      <div className="sticky bg-white w-full top-0 z-40 p-2">
        <div className="grid md:grid-rows-2 grid-rows-1 min-h-[55px]">
          <div className="row-span-1 w-full">
            <div className="flex flex-row w-full">
              <div className="w-full flex flex-row md:justify-start md:items-start justify-center items-center gap-3 p-2">
                <HamburgerMenu />
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

              <div className="w-full flex flex-row justify-center items-center p-1">
                <a
                  href="https://www.secondlifestores.com"
                  className="flex"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/SLS_STORE_LOGO_BLACK.png"
                    alt="Store Logo"
                    width={200}
                    height={20}
                    priority
                  />
                </a>
              </div>

              <div className="w-full flex flex-row justify-end items-center gap-4 p-2 z-40">
                {/* <div className="hidden md:flex flex-row gap-2">
                  <IconRedirectButton route="/for-you" icon="REGISTER" />
                </div> */}
                <HeartButton />
                <ShoppingCartButton />

                {/* {loggedIn ? <ProfileButton /> : null} */}
                {/* TODO: Finish sign up and sign in */}
              </div>
            </div>
          </div>

          <div className="row-span-1 w-full md:flex hidden">
            <div className="flex-col w-full justify-center items-center ">
              <div className="flex flex-col items-center justify-center w-full h-full">
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
