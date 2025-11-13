import http from "../../interceptor/index";

export const Sendloginrequest = async (logininfo) => {
  try {
    const response = await http.post("/Sign/Login", logininfo);

    console.log("login responsee", response);

    return response;
  } catch (error) {
    console.log("Error response:", error.response);
    console.log("Error message:", error.message);
    console.log("Error config:", error.config);
    console.log("Error details:", error.response?.data || error.message);

    return false;
  }
};
