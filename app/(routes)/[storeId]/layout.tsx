import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";

import getCategories from "@/actions/get-categories";
import getDesigners from "@/actions/get-designers";
import getSellers from "@/actions/get-sellers";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import getBillboardByName from "@/actions/get-billboard-by-name";
import getProducts from "@/actions/get-products";
import getMaterials from "@/actions/get-materials";
import getConditions from "@/actions/get-conditions";
import getGenders from "@/actions/get-genders";
import getSubcategories from "@/actions/get-sub-categories";
import getStore from "@/actions/get-store";
import React from "react";
import { Billboard } from "@/types";
// import getTopTen from "@/actions/get-top-ten";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { storeId } = params;
  const store = await getStore(storeId);
  const sellers = await getSellers();
  const designers = await getDesigners();
  const categories = await getCategories();
  const sizes = await getSizes();
  const colors = await getColors();
  const materials = await getMaterials();
  const conditions = await getConditions();
  const genders = await getGenders(storeId);
  const subcategories = await getSubcategories();
  const products = await getProducts({ all: true });
  // const topTen = await getTopTen({ all: true }, "most-viewed");

  const billboard: Billboard | null = await getBillboardByName(
    "HomePageFullScreen",
    storeId
  );

  return (
    <div>
      <Navbar
        store={store}
        sellers={sellers}
        designers={designers}
        categories={categories}
        sizes={sizes}
        colors={colors}
        materials={materials}
        conditions={conditions}
        genders={genders}
        subcategories={subcategories}
        products={products}
        // topTen={topTen}
        billboard={billboard}
      />
      {children}
      <Footer
        searchParams={{
          categoryId: "",
          designerId: "",
          sellerId: "",
          sizeId: "",
          colorId: "",
          conditionId: "",
          materialId: "",
          subcategoryId: "",
          genderId: "",
          sort: "",
          isFeatured: undefined,
          isOnSale: undefined,
          isCharity: undefined,
          isHidden: undefined,
        }}
        params={{
          storeId: storeId,
        }}
      />
    </div>
  );
}
