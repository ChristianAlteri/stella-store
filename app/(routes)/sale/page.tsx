import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/Product/product-card";
import LeftSidebar from "@/components/SideBars/LeftSideBar";
import RightSidebar from "@/components/SideBars/RightSideBar";
import getProducts from "@/actions/get-products";
import FullscreenProductFiltersFooter from "@/components/Filters/full-screen-product-filters-footer";

export const revalidate = 0;

interface SalePageProps {
  params: {
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
    minPrice: number;
    maxPrice: number;
  };
}

const SalePage: React.FC<SalePageProps> = async ({ searchParams, params }) => {

  return (
    <>
      <div className="flex flex-row w-full justify-center items-center text-center">
        <div className="w-full justify-center text-center">
          <h2 className="text-2xl font-bold text-black mt-2">SALE!</h2>
        </div>
      </div>
      <div className="justify-start items-center md:grid flex grid-cols-8 gap-4 bg-white ">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full hidden sticky h-full md:grid ml-4">
          <LeftSidebar />
        </div>

        {/* Second column */}
        <ProductGrid isOnSale={true} />

        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-full hidden sticky h-full md:grid">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default SalePage;
