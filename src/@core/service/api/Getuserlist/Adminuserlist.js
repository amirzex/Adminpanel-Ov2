import http from "../../interceptor/index";

const Sendloginrequest = async (logininfo) => {
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

const getcousrid = async () => {
  try {
    const respone = await http.get("/Home/GetCoursesTop?Count=5");

    return respone;
  } catch (error) {}
};

const Getcourseuserlist = async () => {
  try {
    const respone = await http.get(
      "/User/UserMannage?PageNumber=1&RowsOfPage=1000&SortingCol=DESC&SortType=InsertDate"
    );

    console.log("admin api user list: ", respone);

    return respone;
  } catch (error) {
    console.log("error from user list admin : ", error);
  }
};

const Addnewuser = async (userData) => {
  try {
    const response = await http.post("/User/CreateUser", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Add user error:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "Failed to add user",
      errors: error.response?.data?.errors,
    };
  }
};

const Getuserdetail = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const response = await http.get(`/User/UserDetails/${userId}`);
    return response;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("User not found");
    }
    throw new Error(`Error fetching user details: ${error.message}`);
  }
};

const useCreateUser = async (userData) => {
  try {
    const response = await http.post("/User/CreateUser", userData);
    console.log("create user:", response);
    return response;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            "Invalid user data: " + (error.response.data?.message || "")
          );
        case 401:
          throw new Error("Unauthorized - Please login again");
        case 403:
          throw new Error("Forbidden - You don't have permission");
        case 404:
          throw new Error("User not found");
        case 500:
          throw new Error("Server error - Please try again later");
        default:
          throw new Error(
            `Request failed with status ${error.response.status}`
          );
      }
    } else if (error.request) {
      throw new Error(
        "No response from server - Check your network connection"
      );
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

const updateUserDetail = async (userData) => {
  try {
    const response = await http.put("/User/UpdateUser/", userData);
    console.log("Updated user details:", response);
    return response;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            "Invalid user data: " + (error.response.data?.message || "")
          );
        case 401:
          throw new Error("Unauthorized - Please login again");
        case 403:
          throw new Error("Forbidden - You don't have permission");
        case 404:
          throw new Error("User not found");
        case 500:
          throw new Error("Server error - Please try again later");
        default:
          throw new Error(
            `Request failed with status ${error.response.status}`
          );
      }
    } else if (error.request) {
      throw new Error(
        "No response from server - Check your network connection"
      );
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

const useAccessUser = async (userData) => {
  try {
    const response = await http.post("/User/AddUserAccess", userData);
    console.log("create user:", response);
    return response;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error(
            "Invalid user data: " + (error.response.data?.message || "")
          );
        case 401:
          throw new Error("Unauthorized - Please login again");
        case 403:
          throw new Error("Forbidden - You don't have permission");
        case 404:
          throw new Error("User not found");
        case 500:
          throw new Error("Server error - Please try again later");
        default:
          throw new Error(
            `Request failed with status ${error.response.status}`
          );
      }
    } else if (error.request) {
      throw new Error(
        "No response from server - Check your network connection"
      );
    } else {
      throw new Error("Request setup error: " + error.message);
    }
  }
};

export {
  Getcourseuserlist,
  getcousrid,
  Sendloginrequest,
  Addnewuser,
  Getuserdetail,
  updateUserDetail,
  useCreateUser,
  useAccessUser,
};
