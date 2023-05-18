import axios from "axios";

const login = async () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const response = axios.get(`${baseUrl}user/login`);
  return response.data;
};

export default login;
