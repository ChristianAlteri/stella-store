import FooterMobileButtons from "./footer-mobile-buttons";

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
import FullscreenProductFiltersFooter from "../Home/full-screen-product-filters-footer";

interface FooterProps {
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
    isFeatured: boolean;
    isOnSale: boolean;
    isCharity: boolean;
    isHidden: boolean;
  };
}

const Footer: React.FC<FooterProps> = async ({ searchParams }) => {
  const productData = await getProducts({
    sort: searchParams.sort,
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
    categoryId: searchParams.categoryId,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    conditionId: searchParams.conditionId,
    materialId: searchParams.materialId,
    isOnSale: searchParams.isOnSale,
    isCharity: searchParams.isCharity,
    isHidden: searchParams.isHidden,
    isFeatured: searchParams.isFeatured,
    subcategoryId: searchParams.subcategoryId,
    genderId: searchParams.genderId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const conditions = await getConditions();
  const designers = await getDesigners();
  const sellers = await getSellers();
  const categories = await getCategories();
  const materials = await getMaterials();
  const genders = await getGenders();
  const subcategories = await getSubcategories();
  const onSaleProducts = await getProducts({ isOnSale: true });

  return (
    <>
      {/* This footer will only render on screens smaller than 768px */}
      <footer className="bg-white bottom-0 sticky inset-x-0 md:hidden grid grid-cols-4 justify-center text-center items-center z-50">
        <FooterMobileButtons
          products={productData}
          colors={colors}
          sizes={sizes}
          conditions={conditions}
          designers={designers}
          sellers={sellers}
          categories={categories}
          materials={materials}
          subcategories={subcategories}
          genders={genders}
          onSaleProducts={onSaleProducts}
        />
      </footer>
      {/* This footer will only render on screens larger than an iPad (larger than 768px) */}
      <footer className="hidden md:block bg-white border-t bottom-0 sticky inset-x-0 lg:relative">
        <div className="mx-auto py-10 w-full justify-center items-center">
            {/* <FullscreenProductFiltersFooter 
              productData={productData}
              genders={genders}
            /> */}
          <p className="text-center text-xs text-stone-600">
            &copy; 2024 Aviva, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
