"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CiCircleRemove } from "react-icons/ci";
import { Billboard } from "@/types";
import SearchResults from "./components/search-results";
import getBillboardByName from "@/actions/get-billboard-by-name";

interface MegaSearchProps {
  icon?: React.ReactNode;
}

const MegaSearch: React.FC<MegaSearchProps> = ({ icon }) => {
  const [open, setOpen] = useState(false);
  const [searchBy, setSearchBy] = useState("STORE");
  const [homePageBillboard, setHomePageBillboard] = useState<
    Billboard | Billboard[] | null
  >(null);
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    setOpen(false);
    setIsMounted(true);
  }, [pathname]);

  useEffect(() => {
    const fetchBillboard = async () => {
      try {
        const data = await getBillboardByName(
          "HomePageFullScreen",
          `${process.env.NEXT_PUBLIC_STORE_ID}`
        );
        setHomePageBillboard(data);
      } catch (error) {
        console.error("Error fetching homepage billboard:", error);
        setHomePageBillboard(null);
      } finally {
        setLoading(false);
      }
    };

    if (isMounted) {
      fetchBillboard();
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  // @ts-ignore
  const imageUrl = homePageBillboard ? homePageBillboard?.imageUrl : null;

  return (
    <>
      <div className="flex w-full justify-start gap-4">
        <Button
          onClick={onOpen}
          className="flex hover:underline hover:cursor-pointer hover:text-stone-900 transition z-50 text-xs items-center "
        >
          {icon}
        </Button>
      </div>

      <Dialog open={open} as="div" className="relative z-50 " onClose={onClose}>
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-60" />

        {/* Dialog position */}
        <div className="fixed justify-center items-center inset-0 z-40 flex">
          <Dialog.Panel className="flex rounded-sm flex-col h-2/3 w-2/3 overflow-y-auto shadow-xl border border-black">
            <div
              className="flex flex-col w-full h-full items-center justify-center p-1"
              style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              {/* Fallback text for null billboard */}
              {/* {!imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                  <p className="text-white text-2xl font-bold">Please add a Billboard via your backend</p>
                </div>
              )} */}
              <div
                className="flex flex-row w-full justify-between items-center p-1 hover:cursor-pointer"
                onClick={onClose}
              >
                <div className="flex justify-center text-super-small sm:text-xs font-medium transition-colors">
                  SEARCH OUR STORE:
                </div>
                <CiCircleRemove size={22} />
              </div>

              <div className="grid grid-cols-1 w-2/3 justify-start items-start h-full">
                {/* Search Bar */}
                <div className="h-full w-full">
                  <div className="flex flex-row gap-4 items-start justify-start">
                    {/* <button
                        className={cn(
                          "flex justify-start md:text-super-small text-xs font-medium transition-colors hover:underline hover:cursor-pointer p-2",
                          searchBy === "Product"
                            ? "flex justify-center underline"
                            : "text-black"
                        )}
                        onClick={() => setSearchBy("CLIENT_ADVISOR")}
                      >
                      CLIENT ADVISOR
                    </button> */}
                    <button
                      className={cn(
                        "flex justify-start md:text-super-small text-xs font-medium transition-colors hover:underline hover:cursor-pointer p-2",
                        searchBy === "STORE"
                          ? "flex justify-center underline"
                          : "text-stone-500"
                      )}
                      onClick={() => setSearchBy("STORE")}
                    >
                      ENTIRE STORE
                    </button>
                  </div>
                  <SearchResults label="Search entire store..." />
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MegaSearch;
