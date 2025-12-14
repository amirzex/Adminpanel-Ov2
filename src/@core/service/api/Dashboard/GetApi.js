import http from "../../interceptor/index";

export const GetDashboardReport = async () => {
  console.log(">>> Calling GetDashboardReport");

  try {
    const data = await http.get("/Report/DashboardReport");
    console.log(">>> API RESULT:", data);
    return data || null;
  } catch (error) {
    console.log(">>> API ERROR:", error);
    return null;
  }
};

export const GetDashboardTechnologyReport = async () => {
  try {
    const data = await http.get("/Report/DashboardTechnologyReport");
    return data || null;
  } catch (error) {
    return null;
  }
};


export const GetProfileInfo = async () => {
  console.log(">>> Calling GetProfileInfo");

  try {
    const data = await http.get("/SharePanel/GetProfileInfo");
    console.log(">>> PROFILE API RESULT:", data);
    return data || null;
  } catch (error) {
    console.log(">>> PROFILE API ERROR:", error);
    return null;
  }
};
