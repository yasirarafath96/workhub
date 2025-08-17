import axiosInstance from "../axios";
import { endpoints } from "../endpoints";

export const PostTask = async (payload) => {
    try {
        const response = await axiosInstance.post(endpoints.task.post, payload);
        return response;
    } catch (error) {
        console.log('error post task', error);
        return error;
    }
}