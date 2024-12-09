import FooterMobileButtons from "./components/footer-mobile-buttons";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";
import getConditions from "@/actions/get-conditions";
import getMaterials from "@/actions/get-materials";
import getGenders from "@/actions/get-genders";
import getSubcategories from "@/actions/get-sub-categories";
import IconRedirectButton from "../ui/icon-redirect-button";
import FullscreenProductFiltersFooter from "../Filters/full-screen-product-filters-footer";
import getStore from "@/actions/get-store";
import { Product, Store } from "@/types";

interface FooterProps {
  store: Store;
  products: Product[];
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
  products,
  searchParams,
  params,
}: {
  store: Store;
  products: Product[];
  searchParams: FooterProps["searchParams"];
  params: { storeId: string };
}) => {
  const { storeId } = params;

  const conditions = await getConditions();
  const designers = await getDesigners(`${process.env.NEXT_PUBLIC_STORE_ID}`);  
  const sellers = await getSellers(`${process.env.NEXT_PUBLIC_STORE_ID}`);  
  const categories = await getCategories(`${process.env.NEXT_PUBLIC_STORE_ID}`);

  return (
    <>
      {/* This footer will only render on screens smaller than 768px */}
      <footer className="bg-white bottom-0 sticky inset-x-0 md:hidden grid grid-cols-4 justify-center text-center items-center z-50">
        <FooterMobileButtons
          products={products}
          conditions={conditions}
          designers={designers}
          sellers={sellers}
          categories={categories}
        />
      </footer>
      {/* This footer will only render on screens larger than an iPad (larger than 768px) */}
      <footer className="hidden md:block bg-white border-t bottom-0 sticky inset-x-0 lg:relative">
        <div className="mx-auto w-full justify-center items-center">
          <div className="flex gap-3 w-full h-full flex-row items-center justify-center bottom-0 p-3 mb-4">
            <p className="text-center text-xs text-stone-600">
              &copy; SFTR: All rights reserved.
            </p>
            <IconRedirectButton route="/about-us" icon="ABOUT" />
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
