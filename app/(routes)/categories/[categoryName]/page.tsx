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

const CategoryNamePage = async () => {
    const designersData = await getDesigners();
    const categoryData = await getCategories();
    const sellerData = await getSellers();
    const productData = await getProducts({all: true});
    const billboardData = await getBillboard("4f972736-5236-4e1d-b352-bfb301423d71");

    return ( 
        <>


            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                <LeftSidebar title="Designers" data={designersData} />
               

                {/* Second column */}
                <HomeContainer>
                    <Billboard data={billboardData} />
                    <ProductGrid>
                            {productData.map((item) => (
                                
                                <ProductCard key={item.id} item={item} />
                                
                             ))}
                    </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                <RightSidebar title="Categories" data={sellerData}/>

            </div>
        </>
     );
}
 
export default CategoryNamePage;