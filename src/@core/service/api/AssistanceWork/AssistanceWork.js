import toast from "react-hot-toast";
import http from "../../interceptor/index";

const GetAssistanceWork = async () => {
  try {
    const result = await http.get("/AssistanceWork");
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const createAssistance = async (data) => {
  try {
    if (data instanceof FormData) {
      console.log("FormData being sent:");
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }
    } else {
      console.log("Object payload being sent:", data);
    }

    const response = await http.post("/AssistanceWork", data, {
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

const EditAssistance = async (data) => {
  try {
    const result = await http.put("/AssistanceWork", data, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.success) {
      toast.success(result.message);
      return result;
    } else {
      toast.error(result.message);
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    console.error(
      "Error editing building:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export { GetAssistanceWork, createAssistance, EditAssistance };
