import HomeContainer from "@/components/ui/HomeContainer";
import LeftSidebar from "../../../components/Home/LeftSidebar";
import RightCategorySidebar from "../../../components/Home/RightCategorySidebar";
import ProductGrid from "../../../components/Home/ProductGrid";
import Billboard from "@/components/Billboard/Billboard";
import ProductCard from "@/components/ui/product-card";
import ProductList from "@/components/Home/product-list";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import CategoryCardGrid from "@/components/Home/CategoryCardGrid";
import SellerCard from "@/components/ui/seller-card";


export const revalidate = 0

const SellerPage = async () => {
    const designersData = await getDesigners();
    const categoryData = await getCategories();
    const sellerData = await getSellers();
    const productData = await getProducts({all: true});
    
    
    const billboardData = await getBillboard("a8d1234e-35d9-4dae-896a-762eb28045c3");

    return ( 
        <>

            <div className="flex flex-row w-full gap-4 bg-white">
                
                {/* First column */}
                <LeftSidebar title="Designers" data={designersData} />
               

                {/* Second column */}
                <HomeContainer>
                    <Billboard data={billboardData} />
                    <CategoryCardGrid>
                        {sellerData.map((seller) => (
                        <SellerCard route="sellers" key={seller.name} data={seller} />
                        ))}
                    </CategoryCardGrid>
                </HomeContainer>

                {/* Third column */}

                <RightCategorySidebar title="Categories" data={categoryData}/>

            </div>
        </>
     );
}
 
export default SellerPage;
