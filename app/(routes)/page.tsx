import HomeContainer from "@/components/ui/HomeContainer";
// import LeftSidebar from "../../components/Home/LeftSidebar";
// import RightSidebar from "../../components/Home/RightSidebar";
import ProductGrid from "../../components/Home/ProductGrid";
import Billboard from "@/components/Billboard/Billboard";
import ProductCard from "@/components/Product/product-card";
import ProductList from "@/components/Home/product-list";

import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import getBillboardByName from "@/actions/get-billboard-by-name";
import LeftSidebar from "@/components/SideBars/LeftSideBar";
import getColors from "@/actions/get-colors";
import getSizes from "@/actions/get-sizes";
import ClientAdvisor from "@/components/ui/ClientAdvisor";

export const revalidate = 0;

const Homepage = async () => {
  const designers = await getDesigners();
  const categories = await getCategories();
  const sellers = await getSellers();
  const products = await getProducts({ all: true });
  const colors = await getColors();
  const sizes = await getSizes();
  const billboard = await getBillboardByName("homePage");


  
  return (
    <>
      {/* TODO: if logged in re route to 'for-you' page */}
      <div className="flex flex-row w-full h-full gap-4 bg-white">
        {/* First column */}
        <LeftSidebar
          designers={designers}
          categories={categories}
          sellers={sellers}
        />

        {/* Second column */}
        <HomeContainer>
          {/* <Billboard data={billboardData} /> */}
          <ClientAdvisor 
            products={products}
          />
          <ProductGrid>
            {products.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </ProductGrid>
        </HomeContainer>

        {/* Third column

                    <RightSidebar title="Sellers" data={sellerData}/> */}
      </div>
    </>
  );
};

export default Homepage;
