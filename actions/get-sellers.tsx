// import { Seller } from "@/types";

// const URL=`${process.env.NEXT_PUBLIC_API_URL}/sellers`;

// const getSellers = async (): Promise<Seller[]> => {
//   const res = await fetch(URL);
//   console.log("res from get-sellers", res.body);

//   return res.json();
// };

// export default getSellers;

import axios from 'axios';
import { Seller } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sellers`;

const getSellers = async (): Promise<Seller[]> => {
  try {
    const response = await axios.get(URL);
    console.log("response from get-sellers", response.data);

    return response.data;
  } catch (error) {
    // Handle errors gracefully
    console.error("Error fetching sellers:", error);
    throw error;
  }
};

export default getSellers;