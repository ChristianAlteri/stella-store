import { Product } from "@/types";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface MiniProductCarouselProps {
  data: Product[] | undefined;
  miniProductTitle?: string;
  miniProductRoute?: string;
}

const MiniProductCarousel: React.FC<MiniProductCarouselProps> = ({ data, miniProductTitle, miniProductRoute }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

//   useEffect(() => {
//     intervalIdRef.current = setInterval(() => {
//       setCurrentIndex((currentIndex) => {
//         const newIndex = (currentIndex + 1) % data!.length;
//         return newIndex;
//       });
//     }, 1000);

//     return () => {
//       if (intervalIdRef.current) {
//         clearInterval(intervalIdRef.current);
//       }
//     };
//   }, [data]);

  return (
    <>
     <Link
          href={miniProductRoute || "/"}
          className="flex justify-center text-sm font-medium transition-colors border shadow-md rounded-md p-1 hover:text-stone-900 hover:underline hover:cursor-pointer"
        >
        <div className="flex flex-row p-2 z-50 text-xs bg-transparent text-stone-600 ">
            {miniProductTitle}
        </div>
    </Link>
    <Carousel loop autoplay autoplayDelay={2000} className="rounded-xl" placeholder={undefined}>
        {data?.map((product, index) => (
        <div key={index}>
        <div className="grid grid-cols-3 gap-4">
          {data?.slice(index, index + 3).map((product, i) => (
            <div key={i} className={`relative h-full w-full transition-opacity duration-200 ease-in-out ${product?.isCharity ? "blur-xl" : ""}`}>
              <div className="relative">
                <Image src={product.images[0].url} alt={product.name} width={70} height={70} />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="flex flex-col justify-center items-center m-5">
                    <a href={`/designers/${product?.designer?.id}`} className="text-xs hover:underline underline text-black hover:text-stone-700 bg-stone-200 bg-opacity-60">
                      {product.designer?.name.toUpperCase()}
                    </a>
                    <h3 className="text-xs hover:underline text-black hover:text-stone-700 hover:cursor-pointer bg-stone-200 bg-opacity-60">
                      {product.name}
                    </h3>
                    <div className="text-xs text-white bg-stone-200 bg-opacity-60">{product?.size?.name}</div>
                    <div className="flex flex-row gap-1 bg-stone-200 bg-opacity-60">
                      <h6 className="text-xs text-red-500">£{product.ourPrice}</h6>
                      <h6 className="text-xs text-stone-400">RRP</h6>
                      <h6 className="text-xs text-stone-800 line-through">£{product.retailPrice}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      ))}
    </Carousel>
    </>
  );
};

export default MiniProductCarousel;