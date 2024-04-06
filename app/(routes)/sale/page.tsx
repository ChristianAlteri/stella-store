
import ProductGrid from "@/components/Home/ProductGrid";
import HomeContainer from "@/components/ui/HomeContainer";
import ProductCard from "@/components/Product/product-card";
import getOnSale from "@/actions/get-on-sale";

const salePage = async () => {
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