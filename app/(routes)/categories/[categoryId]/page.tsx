import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/Product/product-card";
import RightSidebar from "@/components/SideBars/RightSideBar";
import LeftSidebar from "@/components/SideBars/LeftSideBar";

import getProducts from "@/actions/get-products";
import getSingleCategory from "@/actions/get-single-category";
import FullscreenProductFiltersFooter from "@/components/Filters/full-screen-product-filters-footer";

export const revalidate = 0;

interface CategoryNamePageProps {
  params: {
    categoryId: string;
    storeId: string;
  };
}

const CategoryNamePage: React.FC<CategoryNamePageProps> = async ({
  params,
}) => {
  const categoryData = await getSingleCategory(params.categoryId);

  return (
    <>
      <div className="flex flex-row p-7 w-full justify-center items-center text-center mb-2">
        <div className="w-full justify-center text-center">
          <h2 className="text-2xl font-bold text-black mt-2 ">
            {categoryData?.name.toUpperCase()}
          </h2>
        </div>
      </div>

      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full hidden sticky h-full md:grid ml-4">
          <LeftSidebar />
        </div>

        {/* Second column */}
        <ProductGrid isOnSale={undefined} categoryId={params.categoryId} />
        <div className="fixed bottom-0 p-9 mb-4 w-1/3 z-50">
          {/* <FullscreenProductFiltersFooter productData={products} /> */}
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-full hidden sticky h-full md:grid">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default CategoryNamePage;
