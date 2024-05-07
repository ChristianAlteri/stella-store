import ProductGrid from "@/components/Home/ProductGrid";
import ProductCard from "@/components/Product/product-card";
import Billboard from "@/components/Billboard/Billboard";
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
import FullscreenProductFilters from "@/components/Home/full-screen-product-filters";
import FullscreenProductFiltersFooter from "@/components/Home/full-screen-product-filters-footer";

export const revalidate = 0;

interface DesignerNamePageProps {
  params: {
    designerId: string;
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

const DesignerNamePage: React.FC<DesignerNamePageProps> = async ({
  params,
  searchParams,
}) => {
  const productData = await getProducts({
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
  });
  const designerData = await getSingleDesigner(params.designerId);
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
  const allProducts = await getProducts({all: true});

  return (
    <>
      <div className="justify-center items-center md:grid flex grid-cols-8 gap-4 bg-white">
        {/* First column */}
        <div className="col-span-1 justify-start items-start w-full p-6 hidden sticky z-50 h-full md:grid" style={{ width: '100%' }}>
          <LeftSidebar
            designers={designers}
            categories={categories}
            sellers={sellers}
          />
        </div>
          

        {/* Second column */}
        <div className="col-span-6 flex flex-col justify-center items-center w-full">
        <Billboard data={designerData?.billboard} />

          <ProductGrid>
            {productData?.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ProductGrid>

          <div className="fixed bottom-0 p-7 w-1/3 z-50">
            <FullscreenProductFiltersFooter 
              productData={productData}
              genders={genders}
            />
          </div>
        </div>

        {/* Third column */}
        <div className="col-span-1 justify-start items-start w-1/6 p-6 hidden sticky z-50 h-full md:flex">
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

export default DesignerNamePage;
