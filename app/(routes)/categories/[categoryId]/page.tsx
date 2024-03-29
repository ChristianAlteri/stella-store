import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/Product/product-card";
import Billboard from "@/components/Billboard/Billboard";
import RightSidebar from "@/components/SideBars/RightSideBar";
import LeftSidebar from "@/components/SideBars/LeftSideBar";
import GenderFilter from "@/components/Home/gender-filter";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";
import getSingleCategory from "@/actions/get-single-category";
import getConditions from "@/actions/get-conditions";
import getMaterials from "@/actions/get-materials";
import getGenders from "@/actions/get-genders";
import getSubcategories from "@/actions/get-sub-categories";

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
    genderId: string;
    subcategoryId: string;
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
    categoryId: params.categoryId,
    sort: searchParams.sort,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    conditionId: searchParams.conditionId,
    materialId: searchParams.materialId,
    genderId: searchParams.genderId,
    subcategoryId: searchParams.subcategoryId,
    isOnSale: searchParams.isOnSale,
    isFeatured: searchParams.isFeatured,
    designerId: searchParams.designerId,
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
  const genders = await getGenders();
  const subcategories = await getSubcategories();

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
        <div className="col-span-6 flex flex-col justify-center items-center w-full">
          <Billboard data={categoryData?.billboard} />
          <div className="flex flex-col justify-center items-center p-2 shadow-lg rounded-md">
            <h1>{categoryData?.name}</h1>
            <GenderFilter valueKey="genderId" name="Genders" data={genders} />
          </div>

          <ProductGrid>
            {productData?.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ProductGrid>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-end items-end w-1/6 p-6 hidden top-0 sticky z-50 h-full md:flex">
          <RightSidebar
            colors={colors}
            sizes={sizes}
            conditions={conditions}
            materials={materials}
            subcategories={subcategories}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryNamePage;
