import toast from "react-hot-toast";
import http from "../../interceptor/index";
import useFormData from "../../../../utility/hooks/useFormData";

const GetAllBuilding = async () => {
  try {
    const result = await http.get("/Building");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const EditBuilding = async (data) => {
  try {
    const result = await http.put("/Building", data, {
      headers: { "Content-Type": "application/json" },
    });
    return result;
  } catch (error) {
    console.error(
      "Error editing building:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createBuilding = async (data) => {
  try {
    if (data instanceof FormData) {
      console.log("FormData being sent:");
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }
    } else {
      console.log("Object payload being sent:", data);
    }

    const response = await http.post("/Building", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.success) {
      toast.success(response.message);
      return response;
    } else {
      toast.error(response.message);
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

export { GetAllBuilding, EditBuilding, createBuilding };
