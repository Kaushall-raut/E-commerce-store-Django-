import "axios";
import axios from "axios";

const Base_Url = import.meta.env.VITE_BACKEND_URL;
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${Base_Url}/api/products`);
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error while fetching data in axios ", error.message);
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await axios.get(`${Base_Url}/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("error while fetching data with axios: " + error.message);
  }
};

export const getCart = async () => {
  try {
    const response =await axios.get(`${Base_Url}/api/cart`)

    return response;
  } catch (error) {
    console.error("Error while fetching data in axios", error);
  }
};

