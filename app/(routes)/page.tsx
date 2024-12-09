import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/Product/product-card";
import LeftSidebar from "@/components/SideBars/LeftSideBar";
import RightSidebar from "@/components/SideBars/RightSideBar";
import getProducts from "@/actions/get-products";

import FullscreenProductFiltersFooter from "@/components/Filters/full-screen-product-filters-footer";
import HomepageBillboard from "@/components/Billboard/HomepageBillboard";

export const revalidate = 0;

interface HomepageProps {
  searchParams: {
    storeId: string;
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
    isFeatured: boolean | undefined;
    isOnSale: boolean | undefined;
    isCharity: boolean | undefined;
    isHidden: boolean | undefined;
    isOnline: boolean | undefined;
    minPrice: number;
    maxPrice: number;
  };
}

const Homepage = async ({
  searchParams,
}: {
  searchParams: HomepageProps["searchParams"];
}) => {
  // Fetch data in parallel using Promise.all
  const products = await getProducts({
    all: true,
    isOnline: true,
    isArchived: false,
    categoryId: searchParams.categoryId,
    sort: searchParams.sort,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    conditionId: searchParams.conditionId,
    materialId: searchParams.materialId,
    genderId: searchParams.genderId,
    subcategoryId: searchParams.subcategoryId,
    isCharity: searchParams.isCharity,
    isHidden: searchParams.isHidden,
    isOnSale: searchParams.isOnSale,
    isFeatured: searchParams.isFeatured,
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });

  return (
    <>
      {/* Large screen Billboard */}
      <div className="flex-row pl-7 pr-7 h-full lg:flex hidden">
        <HomepageBillboard billboardName="HomePageFullScreen" />
      </div>
      {/* Mobile screen Billboard */}
      <div className="flex-row pl-7 pr-7 h-2/3 flex lg:hidden">
        <HomepageBillboard billboardName="HomePageMobile" />
      </div>

      <div className="flex flex-row w-full justify-center items-center text-center mt-7">
        <div className="w-full justify-center text-center">
          <h2 className="text-2xl font-bold text-black mt-2">NEW ARRIVALS</h2>
          <p className="text-sm font-cursive text-light-font">
            Shop all the latest products from our entire store
          </p>
        </div>
      </div>

      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white mt-7">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full hidden sticky h-full md:grid ml-4">
          <LeftSidebar />
        </div>

        {/* Second column */}
        <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
          <ProductGrid>
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ProductGrid>
          <div className="fixed bottom-0 p-9 mb-4 w-1/3 z-50">
            <FullscreenProductFiltersFooter productData={products} />
          </div>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-full hidden sticky h-full md:grid">
          {/* <RightSidebar
            colors={colors}
            sizes={sizes}
            conditions={conditions}
            materials={materials}
            subcategories={subcategories}
            // productData={featuredProducts}
            miniProductTitle="Our top picks"
          /> */}
        </div>
      </div>
    </>
  );
};

export default Homepage;
