import axios from "axios";

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

const authService = { loginUser };
export default authService;
