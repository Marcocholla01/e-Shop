import axios from "axios";
import { BASE_URL } from "../../config";

// get all supports ---Admin
export const adminGetAllSupports = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminGetAllSupportsRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/contactForm/get-all-forms`, {
      withCredentials: true,
    });
    dispatch({
      type: "adminGetAllSupportsSuccess",
      payload: data.forms,
    });
  } catch (error) {
    dispatch({
      type: "adminGetAllSupportsFailed",
      payload: error.response.data.message,
    });
  }
};

export const AdminGetSupportdetails = (supportId) => async (dispatch) => {
  try {
    dispatch({
      type: "adminGetSupportDetailsRequest",
    });

    const { data } = await axios.get(
      `${BASE_URL}/contactForm/get-form/${supportId}`,
      { withCredentials: true }
    );
    dispatch({
      type: "adminGetSupportDetailsSuccess",
      payload: data.form,
    });
  } catch (error) {
    dispatch({
      type: "adminGetSupportDetailsfailed",
      payload: error.response.data.message,
    });
  }
};
