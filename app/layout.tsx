import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";
import ToastProvider from "@/providers/toast-provider";

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
// import getTopTen from "@/actions/get-top-ten";



const font = Roboto({
  weight: "400",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "@nondrobe",
  description: "@@@",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sellers = await getSellers();
  const designers = await getDesigners();
  const categories = await getCategories();
  const sizes = await getSizes();
  const colors = await getColors();
  const materials = await getMaterials();
  const conditions = await getConditions();
  const genders = await getGenders();
  const subcategories = await getSubcategories();
  const products = await getProducts({ all: true });
  // const topTen = await getTopTen({ all: true }, "most-viewed");
  
  const billboard = await getBillboardByName("HomePageFullScreen", "1b82eba5-33e4-42d2-9747-cee435d4c3c7");

  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <Navbar
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
            isCharity: undefined ,
            isHidden: undefined,
          }}
        />
      </body>
    </html>
  );
}
