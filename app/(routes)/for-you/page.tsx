import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/Product/product-card";
import LeftSidebar from "@/components/SideBars/LeftSideBar";
import RightSidebar from "@/components/SideBars/RightSideBar";

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
import AuthForm from "@/components/LoginSignup/auth-form";
import SuggestedContainer from "@/components/Suggested/SuggestedContainer";
import IconRedirectButton from "@/components/ui/icon-redirect-button";
import getBillboardByName from "@/actions/get-billboard-by-name";
import getStore from "@/actions/get-store";
import { Billboard } from "@/types";

export const revalidate = 0;

interface ForYouPageProps {
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

const ForYouPage: React.FC<ForYouPageProps> = async ({ searchParams, params }) => {
  const featuredProducts = await getProducts({
    all: true, isArchived: false, isOnline: true, isFeatured: true,
    categoryId: searchParams.categoryId,
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
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const conditions = await getConditions();
  const designers = await getDesigners();
  const sellers = await getSellers();
  const categories = await getCategories();
  const materials = await getMaterials();
  const subcategories = await getSubcategories();
  const store = await getStore(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const billboard: Billboard | null = await getBillboardByName(
    "HomePageFullScreen",
    `${process.env.NEXT_PUBLIC_STORE_ID}`
  );


  // TODO: loggedIn = false unless logged in;

  return (
    <>
      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white h-full">
        {/* First column */}
        <div
          className="col-span-1 justify-start items-start w-full p-6 hidden sticky h-full md:grid"
          style={{ width: "100%" }}
        >
          <LeftSidebar
            designers={designers}
            categories={categories}
            sellers={sellers}
          />
        </div>

        {/* Second column */}
        <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
          {/* {loggedIn ? ( */}
          {/* <>
            <div className="flex flex-row h-1/3 w-full p-2">
              <div className="w-full">
                <h2 className="text-4xl font-bold text-black mt-2 mb-2">
                  Welcome back, [user name]
                </h2>
                <p className="text-base font-cursive text-light-font">
                  Like, follow and view items - The more you interact with the
                  app the more we will show you some products you might like
                </p>
              </div>
            </div>
            <ProductGrid>
              {featuredProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </ProductGrid>
            <div className="fixed bottom-0 p-7 w-1/3 z-50">
              <FullscreenProductFiltersFooter
                productData={featuredProducts}
                genders={genders}
              />
            </div>
          </> */}
          {/* ) : ( */}

          <div className="flex h-full flex-col justify-center w-full md:w-1/3 grid-rows-4">
            
            <div className="flx flex-col gap-4 items-center mb-2 justify-center row-span-2 h-2/3 mt-4">
              <h2 className="text-center text-sm md:text-md text-black w-full items-center justify-center">
                Register and receive 10% off your first purchase
              </h2>
              <AuthForm 
                billboard={billboard}
              />
              <h2 className="text-center text-sm md:text-md text-black w-full items-center justify-center row-span-1">
                Want to sell with us? 
                  <IconRedirectButton  route={store?.email ? `mailto:${store.email}` : ""} icon="Send us an email" />
              </h2>
            </div>

            {/* <br className="p-5"/> */}

            <div className="flex p-2 row-span-1 mt-4">
              <SuggestedContainer data={featuredProducts.slice(0, 7)} route="trending" title="FEATURED PRODUCTS"/>
            </div>
          </div>
          {/* )} */}
        </div>
        
        {/* Third column */}
        <div
          className="col-span-1 justify-start items-start w-full p-6 hidden sticky h-full md:grid"
          style={{ width: "100%" }}
        >
          <RightSidebar
            colors={colors}
            sizes={sizes}
            conditions={conditions}
            materials={materials}
            subcategories={subcategories}
            // productData={featuredProducts}
            // miniProductTitle="Our top picks"
          />
        </div>

      </div>
    </>
  );
};

export default ForYouPage;
