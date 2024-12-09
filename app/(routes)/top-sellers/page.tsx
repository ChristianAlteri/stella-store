import ProductGrid from "@/components/Home/ProductGrid";
import LeftSidebar from "@/components/SideBars/LeftSideBar";
import RightSidebar from "@/components/SideBars/RightSideBar";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getSellers from "@/actions/get-sellers";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";
import getConditions from "@/actions/get-conditions";
import getMaterials from "@/actions/get-materials";
import getSubcategories from "@/actions/get-sub-categories";
import getTrending from "@/actions/get-trending";
import SellerContainer from "./components/sellerContainer";
import getTopSellers from "@/actions/get-top-sellers";

export const revalidate = 0;

interface TopSellersProps {
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
  };
}

const TopSellers: React.FC<TopSellersProps> = async ({ searchParams, params }) => {
  // const topLikedProducts = await getTrending({
  //   categoryId: searchParams.categoryId,
  //   sort: searchParams.sort,
  //   sizeId: searchParams.sizeId,
  //   colorId: searchParams.colorId,
  //   conditionId: searchParams.conditionId,
  //   materialId: searchParams.materialId,
  //   genderId: searchParams.genderId,
  //   subcategoryId: searchParams.subcategoryId,
  //   isOnSale: searchParams.isOnSale,
  //   isCharity: searchParams.isCharity,
  //   isHidden: searchParams.isHidden,
  //   isFeatured: searchParams.isFeatured,
  //   designerId: searchParams.designerId,
  //   sellerId: searchParams.sellerId,
  //   storeIdFromOnlineStore: process.env.NEXT_PUBLIC_API_URL,
  //   isOnline: searchParams.isOnline,
  // });

  // const sizes = await getSizes(`${process.env.NEXT_PUBLIC_STORE_ID}`);;
  // const colors = await getColors(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  // const conditions = await getConditions();
  // const materials = await getMaterials(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  // const subcategories = await getSubcategories(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const designers = await getDesigners(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const sellers = await getSellers(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const categories = await getCategories(`${process.env.NEXT_PUBLIC_STORE_ID}`);

  let sellerData = await getTopSellers();
  // make sure sellers have products
  sellerData = sellerData.filter(seller => seller.products && seller.products.length > 0 && seller.products.some(product => product.isOnline));

  return (
    <>
      <div className="flex flex-row w-full justify-center items-center text-center mt-4">
        <div className="w-full justify-center text-center">
          <h2 className="text-2xl font-bold text-black mt-2 p-2">TOP SELLERS</h2>
        </div>
      </div>
      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full hidden sticky h-full md:grid ml-4">
          <LeftSidebar/>
        </div>

        {/* Second column */}
        <div className="col-span-6 flex flex-col justify-start items-center w-full h-full">
          <ProductGrid>
            <SellerContainer sellerData={sellerData} />
          </ProductGrid>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-full hidden sticky h-full md:grid p-4">
          {/* <RightSidebar/>
            subcategories={subcategories}
            // productData={featuredProducts}
            miniProductTitle="Our top picks"
          /> */}
        </div>
      </div>
    </>
  );
};

export default TopSellers;
