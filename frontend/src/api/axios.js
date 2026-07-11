import "axios";
import axios from "axios";

export const fetchProducts=async ()=>{
    const Base_Url=import.meta.env.VITE_BACKEND_URL

    try {
        const response=await axios.get(`${Base_Url}/api/products`)
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.error("Error while fetching data in axios ",error.message)
    }
}