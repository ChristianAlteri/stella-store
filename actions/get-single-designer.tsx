import axios from 'axios';


import { Designer } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/designers`;


const getSingleDesigner = async (id: string): Promise<Designer> => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    // console.log("response from get-single-category", response.data);
    return response.data;
  } catch (error) {

    console.error("Error fetching products:", error);
    throw error;
  }
};

export default getSingleDesigner;