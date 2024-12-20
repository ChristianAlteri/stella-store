"use client";

import getBillboardByName from "@/actions/get-billboard-by-name";
import { Billboard } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface HomepageBillboardProps {
  billboardName: string;
}

const HomepageBillboard: React.FC<HomepageBillboardProps> = ({
  billboardName,
}) => {
  // const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [homePageBillboard, setHomePageBillboard] = useState<
    Billboard | Billboard[] | null
  >(null);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  useEffect(() => {
    const fetchBillboard = async () => {
      try {
        const data = await getBillboardByName(
          billboardName,
          `${process.env.NEXT_PUBLIC_STORE_ID}`
        );
        setHomePageBillboard(data);
      } catch (error) {
        console.error("Error fetching homepage billboard:", error);
        setHomePageBillboard(null);
      } finally {
        setLoading(false);
      }
    };


      fetchBillboard();

  }, []);

  // if (!isMounted) {
  //   return null;
  // }

  // if (!homePageBillboard) {
  //   return (
  //     <div className="w-full h-full flex justify-center items-center text-center text-3xl">
  //       <p>No billboard found.</p>
  //     </div>
  //   );
  // }

  // Normalize data to always be an array
  const normalizedData = Array.isArray(homePageBillboard)
    ? homePageBillboard
    : [homePageBillboard];

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center text-muted-foreground text-center">
          <div>Loading...</div>
        </div>
      ) : (
        normalizedData.map((billboard, index) => {
          const isVideo = billboard?.imageUrl?.match(
            /https:\/\/.*\.(video|mp4|MP4|mov).*/
          );
          return isVideo ? (
            <div
              key={index}
              className="flex w-full justify-center items-center"
              style={{ width: "100%", height: "100%", overflow: "hidden" }}
            >
              <video
                muted
                autoPlay
                loop
                src={billboard?.imageUrl || ""}
                className="flex justify-center items-center overflow-hidden bg-cover"
              ></video>
            </div>
          ) : (
            <div
              key={billboard?.id}
              style={{ width: "100%", height: "100%", overflow: "hidden" }}
            >
              <Image
                width={1920}
                height={1080}
                src={billboard?.imageUrl || ""}
                alt={`Image of ${billboard?.name}`}
                priority
              />
            </div>
          );
        })
      )}
    </>
  );
};

export default HomepageBillboard;

// "use client";

// import getBillboardByName from "@/actions/get-billboard-by-name";
// import { Billboard } from "@/types";
// import Image from "next/image";
// import React from "react";
// import { useEffect, useState } from "react";

// interface HomepageBillboardProps {
//   // data: Billboard | Billboard[] | null;
// }

// const HomepageBillboard: React.FC<HomepageBillboardProps> = ({  }) => {
//   const [isMounted, setIsMounted] = useState(false);
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) {
//     return null;
//   }

//   const homePageBillboard = getBillboardByName("HomePageFullScreen", `${process.env.NEXT_PUBLIC_STORE_ID}`)

//   if (!homePageBillboard) {
//     return (
//       <div className="w-full h-full justify-center items-center text-center text-3xl">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   // Normalise data to always be an array
//   const normalizedData = Array.isArray(homePageBillboard) ? homePageBillboard : [homePageBillboard];

//   return (
//     <>
//       {normalizedData?.map((billboard, index) =>
//         billboard?.imageUrl.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/) ? (
//           <div
//             key={index}
//             className="flex w-full justify-center items-center"
//             style={{ width: "100%", height: "100%", overflow: "hidden" }}
//           >
//             <video
//               muted
//               autoPlay
//               loop
//               src={`${billboard?.imageUrl}`}
//               className="flex justify-center items-center overflow-hidden bg-cover"
//               // style={{ objectFit: "cover", width: "100%", height: "100%" }}

//             ></video>
//           </div>
//         ) : (
//           <div
//             key={billboard?.id}
//             style={{ width: "100%", height: "100%", overflow: "hidden" }}
//           >
//             <Image
//               key={billboard?.id}
//               // style={{ objectFit: "cover", width: "100%", height: "100%" }}
//               // fill
//               width={1920}
//               height={1080}
//               src={billboard?.imageUrl}
//               alt={`Image of ${billboard.name} })`}
//               priority
//               className={``}
//             />
//           </div>
//         )
//       )}
//     </>
//   );
// };
// export default HomepageBillboard;
