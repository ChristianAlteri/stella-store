import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/NavBar/NavBar";
import getStore from "@/actions/get-store";
import React from "react";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    store,
  ] = await Promise.all([
    getStore(`${process.env.NEXT_PUBLIC_STORE_ID}`),

  ]);


  return (
    <div>
      <Navbar store={store} />
      {children}
      <Footer
        store={store}
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
