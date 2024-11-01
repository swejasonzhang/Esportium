import axios from "axios";

const registerUser = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_BASE}/users/login`,
      inputValues,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.message?.data?.message ||
      error.message ||
      "Something went wrong! Please try again.";
    return Promise.reject(errorMessage);
  }
};

const loginUser = async (inputValues) => {
  try {
    const axiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_BASE}/users/login`,
      inputValues,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.message?.data?.message ||
      error.message ||
      "Something went wrong! Please try again.";
    return Promise.reject(errorMessage);
  }
};

const logoutUser = async () => {
  try {
    const axiosResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_URL_BASE}/users/logout`,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    const errorMessage =
      error.message?.data?.message ||
      error.message ||
      "Something went wrong! Please try again.";
    return Promise.reject(errorMessage);
  }
};

const authService = { loginUser, registerUser, logoutUser };
export default authService;
