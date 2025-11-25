import { Toast } from "reactstrap";
import http from "../../interceptor/index";
import toast from "react-hot-toast";

const GetAllTechnology = async () => {
  try {
    const result = await http.get("/Technology");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const EditTechnology = async (data) => {
  try {
    const result = await http.put("/Technology", data, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.success) {
      toast.success(result.message);
      return result;
    } else {
      Toast.error(result.message);
      throw new Error(result.message);
    }
  } catch (error) {
    console.error(
      "Error editing Technology:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createTechnology = async (data) => {
  try {
    console.log("Object payload being sent:", data);

    const response = await http.post("/Technology", data, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.success) {
      toast.success(response.message);
      return response;
    } else {
      Toast.error(response.message);
      throw new Error(response.message);
    }
  } catch (error) {
    const message =
      error.response?.data?.ErrorMessage ||
      error.response?.data?.message ||
      JSON.stringify(error.response?.data) ||
      error.message ||
      "Unknown error";
    throw new Error(message);
  }
};

export { GetAllTechnology, EditTechnology, createTechnology };
