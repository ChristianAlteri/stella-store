import FooterMobileButtons from "./components/footer-mobile-buttons";
import IconRedirectButton from "../ui/icon-redirect-button";
import { Product, Store } from "@/types";

interface FooterProps {
  store: Store;
  searchParams: {
    categoryId: string;
    designerId: string;
    sellerId: string;
    sizeId: string;
    colorId: string;
    conditionId: string;
    materialId: string;
    subcategoryId: string;
    genderId: string;
    sort: string;
    isFeatured: boolean | undefined;
    isOnSale: boolean | undefined;
    isCharity: boolean | undefined;
    isHidden: boolean | undefined;
  };
  storeId: string;
}

const Footer = async ({
  store,
}: {
  store: Store;
  searchParams: FooterProps["searchParams"];
}) => {
  return (
    <>
      {/* This footer will only render on screens smaller than 768px */}
      <footer className="bg-white bottom-0 sticky inset-x-0 md:hidden grid grid-cols-4 justify-center text-center items-center z-50">
        <FooterMobileButtons />
      </footer>
      {/* This footer will only render on screens larger than an iPad (larger than 768px) */}
      <footer className="hidden md:block bg-white border-t bottom-0 sticky inset-x-0 lg:relative">
        <div className="mx-auto w-full justify-center items-center">
          <div className="flex gap-3 w-full h-full flex-row items-center justify-center bottom-0 p-3 mb-4">
            <p className="text-center text-xs text-stone-600">
              &copy; SFTR: All rights reserved.
            </p>
            <IconRedirectButton
              route={store?.email ? `mailto:${store.email}` : ""}
              icon="CONTACT US"
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
