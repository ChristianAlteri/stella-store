import { Drawer } from "@material-tailwind/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Category, Designer, Seller } from "@/types";

interface HamburgerMenuProps {
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  designers,
  categories,
  // sellers,
}) => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    closeDrawer();
  }, [pathname]);

  const sellers = [
    { id: "1", instagramHandle: "seller1" },
    { id: "2", instagramHandle: "seller2" },
    { id: "3", instagramHandle: "seller3" },
    { id: "1", instagramHandle: "seller1" },
    { id: "2", instagramHandle: "seller2" },
    { id: "3", instagramHandle: "seller3" },
    { id: "1", instagramHandle: "seller1" },
    { id: "2", instagramHandle: "seller2" },
    { id: "3", instagramHandle: "seller3" },
    { id: "1", instagramHandle: "seller1" },
    { id: "2", instagramHandle: "seller2" },
    { id: "3", instagramHandle: "seller3" },
    { id: "1", instagramHandle: "seller1" },
    { id: "2", instagramHandle: "seller2" },
    { id: "3", instagramHandle: "seller3" },
    { id: "1", instagramHandle: "seller1" },
    { id: "2", instagramHandle: "seller2" },
    { id: "3", instagramHandle: "seller3" },
    { id: "1", instagramHandle: "seller1" },
    { id: "2", instagramHandle: "seller2" },
    { id: "3", instagramHandle: "seller3" },
    { id: "1", instagramHandle: "seller1" },
    { id: "2", instagramHandle: "seller2" },
    { id: "3", instagramHandle: "seller3" },

    { id: "1", instagramHandle: "seller1" },
    { id: "2", instagramHandle: "seller2" },
    { id: "3", instagramHandle: "seller3" },
    
  ]

  return (
    <>
      <div
        onClick={openDrawer}
        className="flex justify-center text-center text-xs hover:underline hover:cursor-pointer"
      >
        <CiMenuBurger
          size={17}
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

          <div className="row-span-3 p-4 overflow-y-auto">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Link href="/sellers" className="underline">Sellers</Link>
                  <div className="mt-2 flex flex-col gap-2">
                    {sellers?.map((seller) => (
                      <Link
                        href={`/sellers/${seller.id}`}
                        key={seller.instagramHandle}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                          pathname === `/sellers/${seller.id}` ? "text-stone" : "text-stone-500"
                        )}
                      >
                        {seller.instagramHandle}
                      </Link>
                    ))}
                  </div>
              </div>
              <div>
                <Link href="/designers" className="underline">Designers</Link>
                <div className="mt-2 flex flex-col gap-2 ">
                  {designers?.map((designer) => (
                    <Link
                      href={`/designers/${designer.id}`}
                      key={designer.name}
                      className={cn(
                        "text-sm hover:text-stone-900 hover:underline hover:cursor-pointer",
                        pathname === `/designers/${designer.id}` ? "text-stone" : "text-stone-500"
                      )}
                    >
                      {designer.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-l">
                <Link href="/categories" className="underline">Categories</Link>
                <div className="mt-2 flex flex-col gap-2 ">
                  {categories?.map((category) => (
                    <Link
                      href={`/categories/${category.id}`}
                      key={category.name}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                        pathname === `/categories/${category.id}` ? "text-stone" : "text-stone-500"
                      )}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row-span-1 bg-stone-100 flex items-center justify-around text-xs text-stone-700">
            <Link href="/top-likes" className="hover:underline">Top liked</Link>
            <Link href="/most-viewed" className="hover:underline">Trending</Link>
            <Link href="/for-you" className="hover:underline">For you</Link>
            <Link href="/" className="hover:underline">New arrivals</Link>
            <Link href="/sale" className="hover:underline">Sale</Link>
          </div>

          <div className="row-span-3 bg-stone-200 flex items-center justify-center">MOVING PRODUCT</div>
        </div>
      </Drawer>
    </>
  );
};

export default HamburgerMenu;