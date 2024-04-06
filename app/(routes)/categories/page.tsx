import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";
import HomepageForSellerDesignerCategory from "@/components/Home/HomepageForSellerDesignerCategory";
import SuggestedContainer from "@/components/ui/SuggestedContainer";

const CategoryPage = async () => {
  // const categoryData = await getCategories();
  // const newArrivalsProducts = await getProducts({all: true});
  // const onSaleProducts = await getProducts({isOnSale: true});

//   TODO: can we do by most sold?
  // const sortByMostPopular = categoryData.sort((a, b) => {

  //   const totalLikesA = a.products.reduce(
  //       //@ts-ignore
  //       (acc, product) => acc + product.likes,
  //       0
  //     );
  //     const totalLikesB = b.products.reduce(
  //       //@ts-ignore
  //       (acc, product) => acc + product.likes,
  //       0
  //     );
  //     return totalLikesB - totalLikesA;
  //   });  

  return (
    <>
      <div className="flex flex-col w-full gap-4 bg-white">
        <h1 className="flex flex-row text-xl w-full justify-center items-center text-center mt-4">Categories</h1>
        {/* <HomepageForSellerDesignerCategory 
        data={sortByMostPopular}
        /> */}
        {/* {onSaleProducts.length > 0 && (<SuggestedContainer route="sale" title="ON SALE" data={onSaleProducts}/>)} */}
        {/* {newArrivalsProducts.length > 0 && (<SuggestedContainer route="/" title="NEW ARRIVALS" data={newArrivalsProducts}/>)} */}
      </div>
    </>
  );
};

export default CategoryPage;
