import axios from "axios";

const loginUser = async (userData) => {
  const axiosResponse = axios
    .post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/login`, userData, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      window.localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return axiosResponse;
};

const authService = { loginUser };
export default authService;
