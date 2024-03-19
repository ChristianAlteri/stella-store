import axios from 'axios';
import { Material } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/materials`;

const getMaterials = async (): Promise<Material[]> => {
  try {
    const response = await axios.get(URL);
    // console.log("response from get-categories", response.data);

    return response.data;
  } catch (error) {

    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default getMaterials;