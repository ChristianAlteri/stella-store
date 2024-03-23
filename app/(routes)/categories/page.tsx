import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getSellers from "@/actions/get-sellers";
import HomepageForSellerDesignerCategory from "@/components/Home/HomepageForSellerDesignerCategory";

const CategoryPage = async () => {
  const designersData = await getDesigners();
  const categoryData = await getCategories();
  const sellerData = await getSellers();

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
      <div className="flex flex-row w-full gap-4 bg-white">
        {/* TODO: Try push menswear and womenswear into category data so pops up first */}
        <HomepageForSellerDesignerCategory 
        categoryData={sortByMostPopular}
        />
        {/* TODO: Add Suggestions? */}
      </div>
    </>
  );
};

export default CategoryPage;
