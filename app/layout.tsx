import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/toast-provider";


const font = Roboto({
  weight: "400",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  title: "Second Life Stores",
  description: "Second Life Stores",
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
