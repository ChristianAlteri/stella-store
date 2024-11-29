import axios from 'axios';


import { Seller } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/sellers`;


const getSingleSeller = async (id: string): Promise<Seller> => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    // console.log("response from get-single-category", response.data);
    return response.data.seller;
  } catch (error) {

    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getSingleSeller;