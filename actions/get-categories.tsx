import axios from 'axios';
import { Category } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(URL);
    // console.log("response from get-categories", response.data);

    return response.data;
  } catch (error) {

    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default getCategories;