import axiosInstance from "../axios"
import { endpoints } from "../endpoints"

export const GetUserDetails = async (id) => {
    try {
        const response = await axiosInstance.get(endpoints.user.get(id));
        return response;
    } catch (error) {
        console.error("Error fetching user details:", error);
        return error;
    }
};

export const GetAllProjects = async (id) => {
    try {
        const response = await axiosInstance.get(endpoints.project.getAll);
        return response;
    } catch (error) {
        console.error("Error fetching All Projects", error);
        return error;
    }
};

export const GetAllUsers = async () => {
    try {
        const response = await axiosInstance.get(endpoints.user.getAll);
        return response;
    } catch (error) {
        console.error("Error fetching All Users", error);
        return error;
    }
};

export const GetAllTasks = async () => {
    try {
        const response = await axiosInstance.get(endpoints.task.getAll);
        return response;
    } catch (error) {
        console.error("Error fetching All Tasks", error);
        return error;
    }
};