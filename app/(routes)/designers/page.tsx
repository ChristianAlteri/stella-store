import getDesigners from "@/actions/get-designers";
import getProducts from "@/actions/get-products";

import SuggestedContainer from "@/components/Suggested/SuggestedContainer";
import HomepageForSellerDesignerCategory from "@/components/Home/HomepageForSellerDesignerCategory";

const DesignerPage = async () => {
  const designerData = await getDesigners();
  const onSaleProducts = await getProducts({ isOnSale: true });

  // TODO: can we do by most sold?
  const sortByMostPopular = designerData.sort((a, b) => {
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
          route="designers"
          routeOne="sellers"
        routeTwo="categories"
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

export default DesignerPage;
