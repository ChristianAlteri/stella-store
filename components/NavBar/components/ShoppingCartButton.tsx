"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { CiShoppingCart } from "react-icons/ci";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import getCheckoutAndLikes from "@/actions/get-checkout-likes";

interface ShoppingCartButtonProps {}

const ShoppingCartButton: React.FC<ShoppingCartButtonProps> = ({}) => {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const router = useRouter();
  const cart = useCart();
  const params = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const fetchData = async () => {
        const cartProductIds = cart.items.map((item) => item.id);

        const response = await getCheckoutAndLikes(
          `${process.env.NEXT_PUBLIC_STORE_ID}`,
          cartProductIds
        );

        setCartProducts(response);
      };
      fetchData();
    }
  }, [isMounted, products]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <Button
        onClick={() => router.push(`/cart`)}
        className="flex flex-row items-center justify-center"
      >
        <span className="p-1 text-super-small text-green-800">
          {cartProducts?.length ?? 0}
        </span>
        <CiShoppingCart
          size="28px"
          className="flex flex-row justify-center absolute hover:cursor-pointer hover:text-stone-900 hover:underline"
        />
      </Button>
    </div>
  );
};

export default ShoppingCartButton;
