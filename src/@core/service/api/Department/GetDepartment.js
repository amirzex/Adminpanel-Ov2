import toast from "react-hot-toast";
import http from "../../interceptor/index";

const GetAllDepartment = async () => {
  try {
    const result = await http.get("/Department");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const EditDepartment = async (data) => {
  try {
    const result = await http.put("/Department", data, {
      headers: { "Content-Type": "application/json" },
    });
    return result;
  } catch (error) {
    console.error(
      "Error editing ClassRoom:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createDepartment = async (data) => {
  try {
    console.log("Object payload being sent:", data);

    const response = await http.post("/Department", data, {
      headers: { "Content-Type": "application/json" },
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

export { GetAllDepartment, EditDepartment, createDepartment };
