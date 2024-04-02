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
  const newArrivalsProducts = await getProducts({all: true});
  const suggestedProducts = await getProducts({all: true}); // make this suggested based on purchase history
  const onSaleProducts = await getProducts({isOnSale: true});
  const unreleasedProducts = await getProducts({isHidden: true});
  const isCharityProducts = await getProducts({isCharity: true});

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
        <h1 className="flex flex-row text-xl w-full justify-center items-center text-center mt-4">Categories</h1>
        <HomepageForSellerDesignerCategory 
        data={sortByMostPopular}
        />
        {onSaleProducts.length > 0 && (<SuggestedContainer route="sale" title="ON SALE" data={onSaleProducts}/>)}
        {newArrivalsProducts.length > 0 && (<SuggestedContainer route="/" title="NEW ARRIVALS" data={newArrivalsProducts}/>)}
        {suggestedProducts.length > 0 && (<SuggestedContainer route="for-you" title="SUGGESTED FOR YOU" data={suggestedProducts}/>)}
        {unreleasedProducts.length > 0 && (<SuggestedContainer route="unreleased" title="UNRELEASED" data={unreleasedProducts} />)}
        {isCharityProducts.length > 0 && (<SuggestedContainer route="is-charity" title="PROCEEDS GO TOWARDS CHARITY" data={isCharityProducts}/>)}
      </div>
    </>
  );
};

export default CategoryPage;
