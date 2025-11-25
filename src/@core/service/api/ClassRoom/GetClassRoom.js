import { Toast } from "reactstrap";
import http from "../../interceptor/index";

const GetAllClassRoom = async () => {
  try {
    const result = await http.get("/ClassRoom");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const EditClassRoom = async (data) => {
  try {
    const result = await http.put("/ClassRoom", data, {
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

const createClassRoom = async (data) => {
  try {
    console.log("Object payload being sent:", data);

    const response = await http.post("/ClassRoom", data, {
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

export { GetAllClassRoom, EditClassRoom, createClassRoom };
