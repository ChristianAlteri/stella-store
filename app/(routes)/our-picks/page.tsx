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
import FullscreenProductFiltersFooter from "@/components/Filters/full-screen-product-filters-footer";

export const revalidate = 0;

interface OurPicksPageProps {
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

const OurPicksPage: React.FC<OurPicksPageProps> = async ({ searchParams, params }) => {
  const featuredProducts = await getProducts({
    all: true, isArchived: false, isOnline: true,
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
    isFeatured: true,
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
  });
  // const featuredProducts = await getProducts({ isFeatured: true });


  const sizes = await getSizes();
  const colors = await getColors();
  const conditions = await getConditions();
  const designers = await getDesigners(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const sellers = await getSellers(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const categories = await getCategories(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const materials = await getMaterials();
  const genders = await getGenders(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const subcategories = await getSubcategories();

  // const onlySaleItems = onSaleItems.filter(product => product.isOnSale);

  return (
    <>
        <div className="flex flex-row w-full justify-center items-center text-center">
          <div className="w-full justify-center text-center">
            <h2 className="text-2xl font-bold text-black mt-2">
              OUR PICKS!
            </h2>
            <p className="text-sm font-cursive text-light-font">
              Shop from our favourite items. Each item in this collection has been carefully chosen by our team to reflect the best of what we offer.
            </p>
          </div>
        </div>
      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white ">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full hidden sticky h-full md:grid ml-4">
          <LeftSidebar
            designers={designers}
            categories={categories}
            sellers={sellers}
          />
        </div>

        {/* Second column */}
        <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">

          <ProductGrid>
            {featuredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ProductGrid>
          <div className="fixed bottom-0 p-9 mb-4 w-1/3 z-50">
            <FullscreenProductFiltersFooter 
              productData={featuredProducts}
            />
          </div>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-full hidden sticky h-full md:grid">
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

export default OurPicksPage;
