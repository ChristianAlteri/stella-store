import axios from 'axios';
import { Subcategory } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/sub-categories`;

const getSubcategories = async (): Promise<Subcategory[]> => {
  try {
    const response = await axios.get(URL);
    // console.log("response from get-categories", response.data);

    return response.data;
  } catch (error) {

    console.error("Error fetching Subcategory:", error);
    throw error;
  }
};

export default getSubcategories;