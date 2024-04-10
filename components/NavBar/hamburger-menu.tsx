import Link from "next/link";
import React, { useEffect } from "react";
import { Category, Designer, Product, Seller } from "@/types";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import MiniProductCarousel from "../Product/mini-product-carousel";

import { Drawer } from "@material-tailwind/react";

import { CiMenuBurger } from "react-icons/ci";
import QuickLinks from "./quick-links";
import useParamsUtil from "@/utils/useParamsUtil";

interface HamburgerMenuProps {
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  topTen?: Product[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  designers,
  categories,
  sellers,
  topTen
}) => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  const { isSellerSelected, isDesignerSelected, isCategorySelected } = useParamsUtil();

  return (
    <>
      <div
        onClick={openDrawer}
        className="flex justify-center text-center text-xs hover:underline hover:cursor-pointer"
      >
        <CiMenuBurger
          size={20}
          className="md:hidden flex justify-center"
        />
      </div>
      <Drawer
        open={open}
        onClose={closeDrawer}
        placement="left"
        transition={{
          type: "tween",
          duration: 0.3,
        }}
        className="bg-white backdrop-filter"
        size={500}
        placeholder={undefined}
      >
        <div className="grid grid-rows-7 h-full">
        <div className="row-span-1 bg-stone-100 flex items-center justify-around text-xs text-stone-700 shadow-md">
            <QuickLinks />
          </div>

          <div className="row-span-3 p-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">

              <div className="border-r p-2 m-1 w-full">
                <Link href="/sellers" className="underline">Sellers</Link>
                  <div className="mt-2 flex flex-col gap-2">
                    {sellers?.map((seller) => (
                      <Link
                        href={`/sellers/${seller.id}`}
                        key={seller.instagramHandle}
                        className={cn(
                          "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                          isSellerSelected(seller.id)
                            ? "text-stone bg-stella-green rounded-md w-full p-1 flex justify-center items-center text-white transition-transform animate-pulse"
                            : "text-stone-500"
                        )}
                      >
                        {seller.instagramHandle}
                      </Link>
                    ))}
                  </div>
              </div>
              <div className="p-2 m-1 w-full">
                <Link href="/designers" className="underline">Designers</Link>
                <div className="mt-2 flex flex-col gap-2 ">
                  {designers?.map((designer) => (
                    <Link
                      href={`/designers/${designer.id}`}
                      key={designer.name}
                      className={cn(
                        "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                        isDesignerSelected(designer.id)
                          ? "text-stone bg-stella-green rounded-md w-full p-1 flex justify-center items-center text-white transition-transform animate-pulse"
                          : "text-stone-500"
                      )}
                    >
                      {designer.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-l p-2 m-1 w-full">
                <Link href="/categories" className="underline">Categories</Link>
                <div className="mt-2 flex flex-col gap-2 ">
                  {categories?.map((category) => (
                    <Link
                      href={`/categories/${category.id}`}
                      key={category.name}
                      className={cn(
                        "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                        isCategorySelected(category.id)
                          ? "text-stone bg-stella-green rounded-md w-full p-1 flex justify-center items-center text-white transition-transform animate-pulse"
                          : "text-stone-500"
                      )}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          

          <div className="row-span-3 bg-stone-200 flex items-center justify-center ">
            <div className="top-0">
                <MiniProductCarousel
                  // TODO: only top ten products
                  data={topTen}
                  miniProductTitle="Most Viewed"
                  miniProductRoute="/most-viewed"
                />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;