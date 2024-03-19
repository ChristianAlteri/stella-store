import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/ui/product-card";
import Billboard from "@/components/Billboard/Billboard";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";
import getSingleCategory from "@/actions/get-single-category";
import LeftSidebar from "@/components/SideBars/LeftSideBar";
import RightSidebar from "@/components/SideBars/RightSideBar";
import getConditions from "@/actions/get-conditions";
import getMaterials from "@/actions/get-materials";

export const revalidate = 0;

interface CategoryNamePageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    sizeId: string;
    colorId: string;
    conditionId: string;
    materialId: string;
    categoryId: string;
    designerId: string;
    sellerId: string;
    sort: string;
    isFeatured: boolean;
    isOnSale: boolean;
  };
}

const CategoryNamePage: React.FC<CategoryNamePageProps> = async ({
  params,
  searchParams,
}) => {
  const productData = await getProducts({
    sort: searchParams.sort,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    conditionId: searchParams.conditionId,
    materialId: searchParams.materialId,
    isOnSale: searchParams.isOnSale,
    isFeatured: searchParams.isFeatured,
    designerId: searchParams.designerId,
    categoryId: params.categoryId,
    sellerId: searchParams.sellerId,
  });
  const categoryData = await getSingleCategory(params.categoryId);

  const sizes = await getSizes();
  const colors = await getColors();
  const conditions = await getConditions();
  const designers = await getDesigners();
  const sellers = await getSellers();
  const categories = await getCategories();
  const materials = await getMaterials();

  return (
    <>
      <div className="grid grid-cols-8 gap-4 bg-white">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-1/6 p-6 hidden sticky z-50 h-full md:flex">
          <LeftSidebar
            designers={designers}
            categories={categories}
            sellers={sellers}
            colors={colors}
            sizes={sizes}
            productData={productData}
          />
        </div>

        {/* Second column */}
        <div className="col-span-6 flex flex-col items-center w-full">
          <Billboard data={categoryData?.billboard} />
          <ProductGrid>
            {productData?.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ProductGrid>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-start items-start w-1/6 p-6 hidden sticky z-50 h-full md:flex">
          <RightSidebar 
          colors={colors} 
          sizes={sizes} 
          conditions={conditions} 
          materials={materials} 
          />
        </div>
      </div>
    </>
  );
};

export default CategoryNamePage;
