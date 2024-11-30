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
import getStore from "@/actions/get-store";
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


  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
          {children}
      </body>
    </html>
  );
}
