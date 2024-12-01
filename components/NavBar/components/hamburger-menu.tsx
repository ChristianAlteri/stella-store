'use client';
import Link from "next/link";
import React, { useEffect } from "react";
import { Category, Designer, Product, Seller } from "@/types";
import { cn } from "@/lib/utils";
import { usePathname, useParams } from "next/navigation";
import { Drawer } from "@material-tailwind/react";
import { CiBadgeDollar, CiMenuBurger } from "react-icons/ci";
import QuickLinks from "./quick-links";
import useParamsUtil from "@/utils/useParamsUtil";
import { MdArrowForwardIos } from "react-icons/md";
import IconRedirectButton from "@/components/ui/icon-redirect-button";
import { GrContact } from "react-icons/gr";

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
  topTen,
}) => {
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  const { isSellerSelected, isDesignerSelected, isCategorySelected } =
    useParamsUtil();

  return (
    <>
      <div
        onClick={openDrawer}
        className="flex justify-center text-center text-xs hover:underline hover:cursor-pointer"
      >
        <CiMenuBurger size={20} className="md:hidden flex justify-center" />
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
        <div className="grid grid-rows-9 h-full">
          <div className="row-span-1 bg-stone-100 flex flex-col items-center justify-around text-xs text-stone-700 shadow-md h-full">
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-row justify-end text-center items-center hover:cursor-pointer w-full">
                <MdArrowForwardIos onClick={closeDrawer} size={13} />
              </div>

              <div className="flex flex-row w-full">
                <QuickLinks />
              </div>
            </div>
          </div>

          <div className="row-span-4 p-4 overflow-y-auto">
            <div className="grid grid-cols-3">
              <div className="flex flex-col items-center border-r w-full p-4">
                <p className="font-bold text-sm bg-white">SELLERS</p>
                <div className="flex flex-col items-center row-span-1 h-full overflow-y-auto bg-white">
                  {sellers?.map((seller) => (
                    <Link
                      href={`${params.storeId}/sellers/${seller.id}`}
                      key={seller.storeName}
                      className={cn(
                        "flex justify-center items-center text-center text-xs font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                        isSellerSelected(seller.id)
                          ? "rounded-md w-full flex text-black underline"
                          : "text-light-font"
                      )}
                    >
                      {seller.storeName.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center border-r w-full p-4">
                <p className="font-bold text-sm bg-white">DESIGNERS</p>
                <div className="flex flex-col items-center row-span-1 h-full overflow-y-auto bg-white">
                  {designers?.map((designer) => (
                    <Link
                      href={`${params.storeId}/designers/${designer.id}`}
                      key={designer.name}
                      className={cn(
                        "flex justify-center items-center text-center text-xs font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                        isDesignerSelected(designer.id)
                          ? "rounded-md w-full flex text-black underline"
                          : "text-light-font"
                      )}
                    >
                      {designer.name.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center w-full p-4">
                <p className="font-bold text-sm bg-white">CATEGORIES</p>
                <div className="flex flex-col items-center row-span-1 h-full overflow-y-auto bg-white">
                  {categories?.map((category) => (
                    <Link
                      href={`${params.storeId}/categories/${category.id}`}
                      key={category.name}
                      className={cn(
                        "flex justify-center items-center text-center text-xs font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                        isCategorySelected(category.id)
                          ? "rounded-md w-full flex text-black underline"
                          : "text-light-font"
                      )}
                    >
                      {category.name.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row-span-3 bg-stone-200 flex items-center justify-center flex-col">

            <div className="md:hidden flex gap-2 w-full h-full flex-row justify-center items-end mb-2">
              <IconRedirectButton route="https://www.instagram.com/anon.drobe" icon="INSTAGRAM" />
              <IconRedirectButton route="https://tiktok.com/@anondrobe" icon="TIKTOK" />
              <IconRedirectButton route="/about-us" icon="ABOUT" />
              <IconRedirectButton route="/for-you" icon="REGISTER" />
              <IconRedirectButton route="mailto:admin@anondrobe.com" icon="CONTACT US" />
            </div>
            {/* <aside className="flex flex-col w-2/3 justify-center items-center text-center top-0 h-2/3">
              {topTen && topTen.length > 0 && (
                <MiniProductCard
                data={topTen}
                miniProductRoute="/most-viewed"
                miniProductTitle="Most Viewed"
                />
              )}
            </aside> */}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;
