// import LeftSidebar from "@/components/Home/LeftSidebar";
import ProductGrid from "@/components/Home/ProductGrid";
// import RightSidebar from "@/components/Home/RightSidebar";
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
import getSingleSeller from "@/actions/get-single-seller";
// import RightCategorySidebar from "@/components/Home/RightCategorySidebar";
import FilterButtons from "@/components/SideBars/filter-buttons";
import MobileFilters from "@/components/ui/MobileFilters";

export const revalidate = 0;

interface SellerNamePageProps {
    params: {
        sellerId: string;
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


const SellerNamePage: React.FC<SellerNamePageProps> = async ({
    params,
    searchParams
}) => {
    const productData = await getProducts({
        sellerId: params.sellerId,
        categoryId: searchParams.categoryId,
        sizeId: searchParams.sizeId,
        colorId: searchParams.colorId,
        materialId: searchParams.materialId,
        isOnSale: searchParams.isOnSale,
        isFeatured: searchParams.isFeatured,
        designerId: searchParams.designerId,
    });
    const sizes = await getSizes();
    const colors = await getColors();
    const sellerData = await getSingleSeller(params.sellerId);

    const designersData = await getDesigners();
    const categoryData = await getCategories()



    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                {/* <LeftSidebar title="Designers" data={designersData} /> */}
               

                {/* Second column */}
                <HomeContainer>

                    <Billboard data={sellerData?.billboard} />
                    <MobileFilters 
                                sizes={sizes} 
                                colors={colors} 
                                designers={designersData}
                                categories={categoryData}
                            />
                    <div className="hidden lg:flex text-start items-start justify-start"> 
                    <div className="grid grid-cols-4 w-full">
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
                                valueKey="designerId"
                                name = "Designers"
                                data={designersData} 
                            />
                            <FilterButtons 
                                valueKey="categoryId"
                                name = "Categories"
                                data={categoryData} 
                            />
                    </div>
                    </div>

                    <ProductGrid>
                            {/* {sellerData?.products?.map((item) => (
                                <ProductCard key={item.id} item={item} />
                             ))} */}
                            {productData?.map((item) => (
                                    <ProductCard key={item.id} item={item} />
                            ))}
                    </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                {/* <RightCategorySidebar title="Categories" data={categoryData}/> */}

            </div>
        </>
     );
}
 
export default SellerNamePage;