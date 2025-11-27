import http from "../interceptor";

export const getApi = async (url, key = null) => {
  try {
    const response = await http.get(url);

    if (key == null) {
      return response;
      console.log("getapi CLG",response)
    }
    if (key && response[key]) {
      return response[key];
    }
    else {
      return null;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
export const postApi = async (url, data = {}, key = null) => {
  try {
    const response = await http.post(url, data)

    if (key == null) {
      return response
    }

    if (key && response[key]) {
      return response[key]
    } else {
      return null
    }
  } catch (error) {
    console.log('postApi error:', error)
    return false
  }
}
export const putApi = async (url, data = {}, key = null) => {
  try {
    const response = await http.put(url, data)

    if (key == null) {
      return response
    }

    if (key && response[key]) {
      return response[key]
    } else {
      return null
    }
  } catch (error) {
    console.log('postApi error:', error)
    return false
  }
}
