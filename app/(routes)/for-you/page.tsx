import LeftSidebar from "@/components/Home/LeftSidebar";
import ProductGrid from "@/components/Home/ProductGrid";
import RightSidebar from "@/components/Home/RightSidebar";
import HomeContainer from "@/components/ui/HomeContainer";

import getDesigners from "@/actions/get-designers";
import getSellers from "@/actions/get-sellers";

const ForYouPage = async () => {
    const designersData = await getDesigners();
    const sellerData = await getSellers();


    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                <LeftSidebar title="Designers" data={designersData} />
               

                {/* Second column */}
                <HomeContainer>
                        {/* <Billboard data={billboardData} /> */}
                        <div>Start liking and viewing products, the more you interact with the app the better it will recommended items</div>
                        <ProductGrid>
                           <div>I need to build the user login</div>
                        </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                <RightSidebar title="Sellers" data={sellerData}/>

            </div>
        </>
     );
}
 
export default ForYouPage;