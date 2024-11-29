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
import getBillboardByName from "@/actions/get-billboard-by-name";

import FullscreenProductFiltersFooter from "@/components/Filters/full-screen-product-filters-footer";
import HomepageBillboard from "@/components/Billboard/HomepageBillboard";
import HomepageBillboardMobile from "@/components/Billboard/HomepageBillboardMobile";


export const revalidate = 0;

interface HomepageProps {
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
    isFeatured: boolean | undefined;
    isOnSale: boolean | undefined;
    isCharity: boolean | undefined;
    isHidden: boolean | undefined;
    minPrice: number;
    maxPrice: number;
  };
}

const Homepage: React.FC<HomepageProps> = async ({ searchParams }) => {
  const products = await getProducts({
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
    isFeatured: searchParams.isFeatured,
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
    all: true,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
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

  const Billboard = await getBillboardByName("HomePageFullScreen", "1b82eba5-33e4-42d2-9747-cee435d4c3c7");
  const BillboardMobile = await getBillboardByName("HomePageMobile", "1b82eba5-33e4-42d2-9747-cee435d4c3c7");
  console.log("Billboard", Billboard);
  console.log("BillboardMobile", BillboardMobile);



  return (
    <>
        {/* Large screen Billboard */}
        <div className="flex-row pl-7 pr-7 h-full lg:flex hidden">
          <HomepageBillboard
            // @ts-ignore
            data={Billboard}
          />
        </div>
        {/* Mobile screen Billboard */}
        <div className="flex-row pl-7 pr-7 h-2/3 flex lg:hidden">
          <HomepageBillboardMobile
            // @ts-ignore
            data={BillboardMobile}
          />
        </div>

        <div className="flex flex-row w-full justify-center items-center text-center mt-7">
          <div className="w-full justify-center text-center">
            <h2 className="text-2xl font-bold text-black mt-2">
              NEW ARRIVALS
            </h2>
            <p className="text-sm font-cursive text-light-font">
              Shop all the latest products from our entire store
            </p>
          </div>
        </div>

      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white mt-7">

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

            <ProductGrid>
              {products.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </ProductGrid>
            <div className="fixed bottom-0 p-9 mb-4 w-1/3 z-50">
              <FullscreenProductFiltersFooter 
                productData={products}
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

export default Homepage;
