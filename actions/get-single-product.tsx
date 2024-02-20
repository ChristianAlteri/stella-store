import axios from 'axios';


import { Product } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/products`;


const getSingleProduct = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    // console.log("response from get-products", response.data);
    return response.data;
  } catch (error) {

    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getSingleProduct;