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
import getSingleDesigner from "@/actions/get-single-designer";
import getGenders from "@/actions/get-genders";
import getSubcategories from "@/actions/get-sub-categories";
import FullscreenProductFiltersFooter from "@/components/Filters/full-screen-product-filters-footer";

export const revalidate = 0;

interface DesignerNamePageProps {
  params: {
    designerId: string;
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
  };
}

const DesignerNamePage: React.FC<DesignerNamePageProps> = async ({
  params,
  searchParams,
}) => {
  const productData = await getProducts({
    all: true, isArchived: false, isOnline: true,
    designerId: params.designerId,
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
    categoryId: searchParams.categoryId,
    sellerId: searchParams.sellerId,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });
  const designerData = await getSingleDesigner(params.designerId);
  const featuredProducts = await getProducts({ all: true, isArchived: false, isOnline: true, isFeatured: true });

  const sizes = await getSizes(`${process.env.NEXT_PUBLIC_STORE_ID}`);;
  const colors = await getColors(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const conditions = await getConditions();
  const designers = await getDesigners(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const sellers = await getSellers(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const categories = await getCategories(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const materials = await getMaterials(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const genders = await getGenders(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  const subcategories = await getSubcategories(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  // const allProducts = await getProducts({all: true});

  return (
    <>
        <div className="flex flex-row p-7 w-full justify-center items-center text-center mb-2">
          {/* <div className="rounded-full">
              <Billboard data={designerData?.billboard} />
            </div> */}
          <div className="w-full justify-center text-center">
            <h2 className="text-2xl font-bold text-black mt-2 ">
              {designerData?.name.toUpperCase()}
            </h2>
          </div>
        </div>

      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full hidden sticky h-full md:grid ml-4">
          <LeftSidebar/>
        </div>
          
        {/* Second column */}
        <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
        {/* <Billboard data={designerData?.billboard} /> */}

          <ProductGrid>
            {productData?.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ProductGrid>

          <div className="fixed bottom-0 p-9 mb-4 w-1/3 z-50">
            <FullscreenProductFiltersFooter 
              productData={productData}
            />
          </div>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-full hidden sticky h-full md:grid">
        <RightSidebar/>
        </div>
      </div>
    </>
  );
};

export default DesignerNamePage;
