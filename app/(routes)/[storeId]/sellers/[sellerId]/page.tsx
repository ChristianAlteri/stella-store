import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/Product/product-card";
import RightSidebar from "@/components/SideBars/RightSideBar";
import LeftSidebar from "@/components/SideBars/LeftSideBar";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";
import getConditions from "@/actions/get-conditions";
import getMaterials from "@/actions/get-materials";
import getSingleSeller from "@/actions/get-single-seller";
import getGenders from "@/actions/get-genders";
import getSubcategories from "@/actions/get-sub-categories";
import FullscreenProductFiltersFooter from "@/components/Filters/full-screen-product-filters-footer";
import ProfileBillboard from "@/components/Billboard/ProfileBillboard";
import Link from "next/link";
import ToggleButton from "./toggle-button";

export const revalidate = 0;

interface SellerNamePageProps {
  params: {
    sellerId: string;
    storeId: string;
  };
  searchParams: {
    sizeId: string;
    colorId: string;
    conditionId: string;
    materialId: string;
    genderId: string;
    subcategoryId: string;
    categoryId: string;
    designerId: string;
    sellerId: string;
    sort: string;
    isFeatured: boolean;
    isOnSale: boolean;
    isCharity: boolean;
    isHidden: boolean;
    isOnline: boolean;
    minPrice: number;
    maxPrice: number;
    isArchived: boolean | undefined;
  };
}

const SellerNamePage: React.FC<SellerNamePageProps> = async ({
  params,
  searchParams,
}) => {
  const productData = await getProducts({
    sellerId: params.sellerId,
    sort: searchParams.sort,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    conditionId: searchParams.conditionId,
    materialId: searchParams.materialId,
    genderId: searchParams.genderId,
    subcategoryId: searchParams.subcategoryId,
    isOnSale: searchParams.isOnSale,
    isCharity: searchParams.isCharity,
    isHidden: searchParams.isHidden,
    isOnline: true,
    isFeatured: searchParams.isFeatured,
    designerId: searchParams.designerId,
    categoryId: searchParams.categoryId,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
    isArchived: searchParams.isArchived,
    storeIdFromOnlineStore: params.storeId,
  });
  const sellerData = await getSingleSeller(params.sellerId);

  const sizes = await getSizes();
  const colors = await getColors();
  const conditions = await getConditions();
  const designers = await getDesigners();
  const sellers = await getSellers();
  const categories = await getCategories();
  const materials = await getMaterials();
  const genders = await getGenders(params.storeId);
  const subcategories = await getSubcategories();

  return (
    <>
      <div className="flex flex-col p-7 w-full justify-center items-center text-center mb-2">
        <Link
          href={`https://instagram.com/${sellerData?.instagramHandle}`}
          className="text-lg text-black"
          target="_blank"
        >
          <div className="flex flex-col p-7 w-full justify-center items-center text-center mb-2">
            <div className="flex justify-center items-center rounded-full overflow-hidden h-1/2 w-full hover:cursor-pointer">
              {/* <ProfileBillboard data={sellerData?.billboard} /> */}
              <ProfileBillboard data={sellerData?.billboard} />
            </div>
            <div className="w-full justify-center text-center">
              <h2 className="text-2xl font-bold text-black mt-2 hover:cursor-pointer hover:underline">
                @{sellerData?.instagramHandle?.toUpperCase() || "Seller Name"}
              </h2>
            </div>
          </div>
        </Link>
        <div className="toggle-container">
          <ToggleButton currentIsArchived={!!searchParams.isArchived} />
        </div>
      </div>

      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full hidden sticky z-50 h-full md:grid ml-4">
          <LeftSidebar
            designers={designers}
            categories={categories}
            sellers={sellers}
          />
        </div>

        {/* Second column */}
        <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
          {/* <Billboard data={sellerData?.billboard} /> */}
          <ProductGrid>
            {productData?.map((item) => (
              <div key={item.id}>
                {searchParams.isArchived ? (
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-red-500 text-white p-2">
                      SOLD 
                      {/* TODO: INstead of ProductCard make a new component that doent let you click through to the product and greys everything out and says SOLD */}
                    </div>
                    <ProductCard item={item} />
                  </div>
                ) : (
                  <ProductCard key={item.id} item={item} />
                )}
              </div>
            ))}
          </ProductGrid>

          <div className="fixed bottom-0 p-9 mb-4 w-1/3 z-50">
            <FullscreenProductFiltersFooter
              productData={productData}
              genders={genders}
            />
          </div>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-full hidden sticky z-50 h-full md:grid">
          <RightSidebar
            colors={colors}
            sizes={sizes}
            conditions={conditions}
            materials={materials}
            subcategories={subcategories}
            // productData={featuredProducts}
            miniProductTitle="Our top picks"
          />
        </div>
      </div>
    </>
  );
};

export default SellerNamePage;
