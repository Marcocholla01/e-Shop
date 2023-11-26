import axios from "axios";
import { BASE_URL } from "../../config";

export const loadUser = () => async (dispatch) => {
  try {
    console.log("Sending request to loadUser");
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${BASE_URL}/user/getuser`, {
      withCredentials: true,
    });
    console.log("Received response for loadUser:", data);
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    console.error("Error loading user:", error);
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};
