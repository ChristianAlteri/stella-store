import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";

import SuggestedContainer from "@/components/Suggested/SuggestedContainer";
import HomepageForSellerDesignerCategory from "@/components/Home/HomepageForSellerDesignerCategory";
import Link from "next/link";

const CategoryPage = async () => {
  const categoryData = await getCategories();
  const onSaleProducts = await getProducts({ isOnSale: true });

  // TODO: can we do by most sold?
  const sortByMostPopular = categoryData.sort((a, b) => {
    const totalLikesA = a.products.reduce(
      //@ts-ignore
      (acc, product) => acc + product.likes,
      0
    );
    const totalLikesB = b.products.reduce(
      //@ts-ignore
      (acc, product) => acc + product.likes,
      0
    );
    return totalLikesB - totalLikesA;
  });

  return (
    <>
      <div className="flex flex-col w-full gap-4 bg-white">
        
        <HomepageForSellerDesignerCategory
          route="categories"
          routeOne="designers"
          routeTwo="sellers"
          data={sortByMostPopular}
        />
        {onSaleProducts.length > 0 && (
          <SuggestedContainer
            route="sale"
            title="ON SALE"
            data={onSaleProducts}
          />
        )}
      </div>
    </>
  );
};

export default CategoryPage;
