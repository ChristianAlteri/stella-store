import LeftSidebar from "@/components/Home/LeftSidebar";
import ProductGrid from "@/components/Home/ProductGrid";
import RightSidebar from "@/components/Home/RightSidebar";
import HomeContainer from "@/components/ui/HomeContainer";
import ProductCard from "@/components/ui/product-card";
import Billboard from "@/components/Billboard/Billboard";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";
import getSingleCategory from "@/actions/get-single-category";
import getSingleDesigner from "@/actions/get-single-designer";
import LeftCategorySidebar from "@/components/Home/LeftCategorySidebar";
import FilterButtons from "@/components/ui/FilterButtons";
import MobileFilters from "@/components/ui/MobileFilters";

export const revalidate = 0;

interface DesignerNamePageProps {
    params: {
        designerId: string;
    },
    searchParams: {
        sizeId: string;
        colorId: string;
        materialId: string;
        categoryId: string;
        designerId: string;
        sellerId: string;
        isFeatured: boolean;
        isOnSale: boolean;
    }

}


const DesignerNamePage: React.FC<DesignerNamePageProps> = async ({
    params,
    searchParams
}) => {
    const productData = await getProducts({
        designerId: params.designerId,
        categoryId: searchParams.categoryId,
        sizeId: searchParams.sizeId,
        colorId: searchParams.colorId,
        materialId: searchParams.materialId,
        isOnSale: searchParams.isOnSale,
        isFeatured: searchParams.isFeatured,
        sellerId: searchParams.sellerId
    });
    const sizes = await getSizes();
    const colors = await getColors();
    const designersData = await getSingleDesigner(params.designerId);

    const categoryData = await getCategories();
    const sellerData = await getSellers();
    const designers = await getDesigners();
    const billboardData = await getBillboard("4f972736-5236-4e1d-b352-bfb301423d71");


    return ( 
        <>


            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                <LeftCategorySidebar title="Categories" data={categoryData} />
               

                {/* Second column */}
                <HomeContainer>
                    <Billboard data={designersData?.billboard} />
                            <MobileFilters 
                                        sizes={sizes} 
                                        colors={colors} 
                                        designers={designers}
                                        categories={categoryData}
                                    />
                    <div className="hidden lg:flex text-start items-start justify-start"> 
                    <div className="grid grid-cols-3 w-full">
                            <FilterButtons 
                                valueKey="sizeId"
                                name = "Sizes"
                                data={sizes} 
                            />
                            <FilterButtons 
                                valueKey="colorId"
                                name = "Colors"
                                data={colors} 
                            />
                            <FilterButtons 
                                valueKey="categoryId"
                                name = "Categories"
                                data={categoryData} 
                            />
                    </div>
                    </div>
                    <ProductGrid>
                            {productData?.map((item) => (
                                            <ProductCard key={item.id} item={item} />
                                    ))}
                            {/* {designersData?.products?.map((item) => (
                                <ProductCard key={item.id} item={item} />
                             ))} */}
                    </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                <RightSidebar title="Sellers" data={sellerData}/>

            </div>
        </>
     );
}
 
export default DesignerNamePage;