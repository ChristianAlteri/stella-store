import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import HomepageForSellerDesignerCategory from "@/components/Home/HomepageForSellerDesignerCategory";
import SuggestedContainer from "@/components/ui/SuggestedContainer";

const CategoryPage = async () => {
  const designersData = await getDesigners();
  const categoryData = await getCategories();
  const sellerData = await getSellers();
  const suggestedProducts = await getProducts({all: true});
  const onSaleProducts = await getProducts({isOnSale: true});

//   TODO: can we do by most sold?
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
        data={sortByMostPopular}
        />
        <SuggestedContainer route="recommended" title="NEW ARRIVALS" data={suggestedProducts}/>
        <SuggestedContainer route="recommended" title="ON SALE" data={onSaleProducts}/>
      </div>
    </>
  );
};

export default CategoryPage;
