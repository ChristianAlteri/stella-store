
import ProductGrid from "@/components/Home/ProductGrid";
import HomeContainer from "@/components/ui/HomeContainer";
import Link from "next/link";


const ForYouPage = async () => {

    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                {/* <LeftSidebar title="Designers" data={designersData} /> */}
               

                {/* Second column */}
                <HomeContainer>
                        {/* <Billboard data={billboardData} /> */}
                        <div>Start liking and viewing products, the more you interact with the app the better it will recommended items</div>
                        <Link
                            className="underline"
                            href="/register">
                                creating an account.
                        </Link>
                        <ProductGrid>
                           <div>I need to build the user login</div>
                        </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                {/* <RightSidebar title="Sellers" data={sellerData}/> */}

            </div>
        </>
     );
}
 
export default ForYouPage;