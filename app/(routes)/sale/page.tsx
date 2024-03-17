// import LeftSidebar from "@/components/Home/LeftSidebar";
import ProductGrid from "@/components/Home/ProductGrid";
// import RightSidebar from "@/components/Home/RightSidebar";
import HomeContainer from "@/components/ui/HomeContainer";
import ProductCard from "@/components/ui/product-card";


import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getSellers from "@/actions/get-sellers";
import getMostViewed from "@/actions/get-most-viewed";
import getOnSale from "@/actions/get-on-sale";

const salePage = async () => {
    const designersData = await getDesigners();
    const categoryData = await getCategories();
    const sellerData = await getSellers();
    const onSaleItems = await getOnSale({isOnSale: true})

    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                {/* <LeftSidebar title="Designers" data={designersData} /> */}
               

                {/* Second column */}
                <HomeContainer>
                        {/* <Billboard data={billboardData} /> */}
                        <div>SALE!!!</div>
                        <ProductGrid>
                            {onSaleItems.map((item) => (
                                
                                <ProductCard key={item.id} item={item} />
                                
                             ))}
                    </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                {/* <RightSidebar title="Sellers" data={sellerData}/> */}

            </div>
        </>
     );
}
 
export default salePage;