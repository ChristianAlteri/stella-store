import axios from 'axios';
import { Gender } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/genders`;

const getGenders = async (storeIdFromOnlineStore: string): Promise<Gender[]> => {
  try {
    const response = await axios.get(`${URL}`, {
      params: { storeIdFromOnlineStore },
    });


    return response.data;
  } catch (error) {

    console.error("Error fetching categories:", error);
    throw error;
  }
};

export default getGenders;