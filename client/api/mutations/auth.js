
import axios from "axios";
import { endpoints } from "../endpoints";


export const signUpUser = async (data) => {
  const res = await axios.post(endpoints.auth.signUp, data);
  return {
    accessToken: res.data.accessToken,
    user: res.data.user,
  };
};

export const loginUser = async (data) => {
  const response = await axios.post(endpoints.auth.login, data);
  return response.data;
};