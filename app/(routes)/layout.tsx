import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";
import getProducts from "@/actions/get-products";
import getStore from "@/actions/get-store";
import React from "react";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   // Fetch all data concurrently
   const [
    store,
    products,
  ] = await Promise.all([
    getStore(`${process.env.NEXT_PUBLIC_STORE_ID}`),
    getProducts({ all: true, isOnline: true, isArchived: false }),
  ]);
  console.debug("STORE FROM ROOT", store);

  return (
    <div>
      <Navbar
        store={store}
        products={products}
      />
      {children}
      <Footer
        store={store}
        products={products}
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
      />
    </div>
  );
}
