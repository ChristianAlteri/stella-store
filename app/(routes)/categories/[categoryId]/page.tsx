import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/Product/product-card";
import Billboard from "@/components/Billboard/Billboard";
import RightSidebar from "@/components/SideBars/RightSideBar";
import LeftSidebar from "@/components/SideBars/LeftSideBar";
import GenderFilter from "@/components/Footer/gender-filter"
import SaleCharityFilter from "@/components/Home/sale-charity-filter";

import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

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
    isCharity: boolean;
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
    isCharity: searchParams.isCharity,
    isFeatured: searchParams.isFeatured,
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
  });
  const categoryData = await getSingleCategory(params.categoryId);
  const featuredProducts = await getProducts({ isFeatured: true });

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
      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full p-6 hidden sticky z-50 h-full md:grid" style={{ width: '100%' }}>
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

          <div className="flex-col justify-center items-center p-2 shadow-2xl rounded-md w-1/4 h-full border hidden md:flex">
            <h1>{categoryData?.name}</h1> 
            <div className="flex flex-row justify-center items-center p-4 shadow-lg rounded-md w-full h-full ">

            <div className=" h-full w-full">
              <GenderFilter 
                icon={<BsGenderMale size={20}/>}
                gender={genders ? genders[0] : undefined} 
              />
            </div>
            <div className=" h-full w-full">
              <GenderFilter 
                icon={<BsGenderFemale size={20}/>}
                gender={genders ? genders[1] : undefined} 
              />
            </div>
            </div>
              <SaleCharityFilter/>
          </div>

          <ProductGrid>
            {productData?.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ProductGrid>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-start items-start w-full p-6 hidden sticky z-50 h-full md:grid" style={{ width: '100%' }}>
          <RightSidebar
            colors={colors}
            sizes={sizes}
            conditions={conditions}
            materials={materials}
            subcategories={subcategories}
            productData={featuredProducts}
            miniProductTitle="Our top picks"
          />
        </div>
      </div>
    </>
  );
};

export default CategoryNamePage;
