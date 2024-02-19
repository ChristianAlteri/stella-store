import HomeContainer from "@/components/ui/HomeContainer";
import LeftSidebar from "../../components/Home/LeftSidebar";
import RightSidebar from "../../components/Home/RightSidebar";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import ProductGrid from "../../components/Home/ProductGrid";
import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/Billboard/Billboard";

export const revalidate = 0

const Homepage = async () => {
    const designersData = await getDesigners();
    const categoryData = await getCategories();
    const billboardData = await getBillboard("d391b3a5-91dc-4e9e-b088-fd2e9057e743");

    return ( 
        <>
            {/* <div className="grid grid-cols-6 gap-4"> */}
            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                <LeftSidebar data={designersData} />
               

                {/* Second column */}
                <HomeContainer>
                    <Billboard data={billboardData} />
                    <ProductGrid>
                        <div>hi</div>
                        <div>hi</div>
                    </ProductGrid>
                </HomeContainer>

                {/* Third column */}

                <RightSidebar data={categoryData}/>

            </div>
        </>
     );
}
 
export default Homepage;
