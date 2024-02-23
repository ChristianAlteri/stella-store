import axios from 'axios';


import { Category } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/categories`;


const getSingleCategory = async (id: string): Promise<Category> => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    // console.log("response from get-products", response.data);
    return response.data;
  } catch (error) {

    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getSingleCategory;