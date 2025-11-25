import { Toast } from "reactstrap";
import http from "../../interceptor/index";
import toast from "react-hot-toast";

const GetAllTerm = async () => {
  try {
    const result = await http.get("/Term");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const EditTerm = async (data) => {
  try {
    const result = await http.put("/Term", data, {
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
      "Error editing TechTermnology:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createTerm = async (data) => {
  try {
    console.log("Object payload being sent:", data);

    const response = await http.post("/Term", data, {
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

export { GetAllTerm, EditTerm, createTerm };
