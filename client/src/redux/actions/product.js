import axios from "axios";
import { BASE_URL } from "../../config";

// create product
export const createPrduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "createPrductRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${BASE_URL}/product/create-product`,
      newForm,
      config,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "createPrductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "createPrductFail",
      payload: error.response.data.message,
    });
  }
};
