import axiosInstance from "../axios"
import { endpoints } from "../endpoints"

export const GetUserDetails = async (id) => {
    try {
        const response = await axiosInstance.get(endpoints.user.get(id));
        return response;
    } catch (error) {
        console.error("Error fetching user details:", error);
        throw error;
    }
};