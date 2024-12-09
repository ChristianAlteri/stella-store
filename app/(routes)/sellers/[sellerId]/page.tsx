import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/Product/product-card";
import RightSidebar from "@/components/SideBars/RightSideBar";
import LeftSidebar from "@/components/SideBars/LeftSideBar";
import getProducts from "@/actions/get-products";
import getSingleSeller from "@/actions/get-single-seller";
import FullscreenProductFiltersFooter from "@/components/Filters/full-screen-product-filters-footer";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    all: true,
    isArchived: false,
    isOnline: true,
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
    isFeatured: searchParams.isFeatured,
    designerId: searchParams.designerId,
    categoryId: searchParams.categoryId,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });

  const sellerData = await getSingleSeller(params.sellerId);

  return (
    <>
      <div className="flex flex-col p-7 w-full justify-center items-center text-center mb-2">
        {/* <div className="toggle-container">
          <ToggleButton currentIsArchived={!!searchParams.isArchived} />
        </div> */}
      </div>

      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full hidden sticky h-full md:grid ml-4">
          <LeftSidebar />
        </div>

        {/* Second column */}
        <div className="col-span-6 flex flex-col justify-start items-center w-full h-full">
          <ProductGrid>
            {productData?.map((item) => (
              <div key={item.id}>
                {searchParams.isArchived ? (
                  <div className="relative">
                    <div className="absolute top-0 left-0 bg-red-500 text-white p-2">
                      SOLD
                      {/* TODO: Instead of ProductCard make a new component that doesn't let you click through to the product and greys everything out and says SOLD and if isOnline false but isArchived true then write in store exclusive*/}
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
            <FullscreenProductFiltersFooter productData={productData} />
          </div>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-full hidden sticky h-full md:grid">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default SellerNamePage;

// return (
//   <>
//   <Link
//           href={`https://instagram.com/${sellerData?.instagramHandle.replace(
//             "@",
//             ""
//           )}`}
//           className="text-lg text-black"
//           target="_blank"
//         >
//           <div className="flex flex-col p-7 w-full justify-center items-center text-center mb-2">
//             <div className="flex flex-col justify-center items-center overflow-hidden h-1/2 w-full gap-2">
//               {/* <ProfileBillboard data={sellerData?.billboard} /> */}
//               <Avatar className="w-24 h-24">
//                 <AvatarImage
//                   src={
//                     sellerData?.billboard?.imageUrl ?? "/default-profile.png"
//                   }
//                   alt={`${sellerData.storeName}`}
//                 />
//                 <AvatarFallback>
//                   {sellerData.storeName[0].toUpperCase()}
//                   {sellerData.storeName[1].toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="w-full justify-center text-center">
//                 <h2 className="text-xs text-black mt-2">
//                   {sellerData?.description}
//                 </h2>
//               </div>
//             </div>
//             <div className="w-full justify-center text-center">
//               <h2 className="text-2xl font-bold text-black mt-2">
//                 {sellerData?.storeName?.toUpperCase() || "Seller Name"}
//               </h2>
//             </div>
//           </div>
//         </Link></>
// )
