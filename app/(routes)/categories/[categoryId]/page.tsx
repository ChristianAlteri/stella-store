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

export const revalidate = 0;

interface CategoryNamePageProps {
    params: {
        categoryId: string;
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


const CategoryNamePage: React.FC<CategoryNamePageProps> = async ({
    params,
    searchParams
}) => {
    const productData = await getProducts({
        categoryId: params.categoryId,
        sizeId: searchParams.sizeId,
        colorId: searchParams.colorId,
        materialId: searchParams.materialId,
        isOnSale: searchParams.isOnSale,
        isFeatured: searchParams.isFeatured,
        designerId: searchParams.designerId,
        sellerId: searchParams.sellerId
    });
    const sizes = await getSizes();
    const colors = await getColors();
    const categoryData = await getSingleCategory(params.categoryId);

    const designersData = await getDesigners();
    const sellerData = await getSellers();



    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                <LeftSidebar title="Designers" data={designersData} />
               

                {/* Second column */}
                <HomeContainer>

                    <Billboard data={categoryData?.billboard} />

                    <ProductGrid>
                            {categoryData?.products?.map((item) => (
                                
                                <ProductCard key={item.id} item={item} />
                                
                             ))}
                    </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                <RightSidebar title="Sellers" data={sellerData}/>

            </div>
        </>
     );
}
 
export default CategoryNamePage;