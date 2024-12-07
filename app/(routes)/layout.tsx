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

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const store = await getStore(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  // const sellers = await getSellers();
  // const designers = await getDesigners();
  // const categories = await getCategories();
  // const sizes = await getSizes();
  // const colors = await getColors();
  // const materials = await getMaterials();
  // const conditions = await getConditions();
  // const genders = await getGenders(`${process.env.NEXT_PUBLIC_STORE_ID}`);
  // const subcategories = await getSubcategories();
  // const products = await getProducts({ all: true });

  // const billboard: Billboard | null = await getBillboardByName(
  //   "HomePageFullScreen",
  //   `${process.env.NEXT_PUBLIC_STORE_ID}`
  // );
   // Fetch all data concurrently
   const [
    store,
    sellers,
    designers,
    categories,
    sizes,
    colors,
    materials,
    conditions,
    genders,
    subcategories,
    products,
    billboard,
  ] = await Promise.all([
    getStore(`${process.env.NEXT_PUBLIC_STORE_ID}`),
    getSellers(),
    getDesigners(),
    getCategories(),
    getSizes(),
    getColors(),
    getMaterials(),
    getConditions(),
    getGenders(`${process.env.NEXT_PUBLIC_STORE_ID}`),
    getSubcategories(),
    getProducts({ all: true, isOnline: true, storeIdFromOnlineStore: `${process.env.NEXT_PUBLIC_STORE_ID}` }),
    getBillboardByName("HomePageFullScreen", `${process.env.NEXT_PUBLIC_STORE_ID}`),
  ]);
  console.debug("STORE FROM ROOT", store);

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
          storeId: `${process.env.NEXT_PUBLIC_STORE_ID}`,
        }}
      />
    </div>
  );
}
