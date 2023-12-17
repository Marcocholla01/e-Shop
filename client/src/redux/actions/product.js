import axios from "axios";
import { BASE_URL } from "../../config";

// create product
export const createProduct = (newForm) => async (dispatch) => {
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

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${BASE_URL}/product/all-products-shop/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// Action to clear product creation state
// export const clearProductState = () => (dispatch) => {
//   dispatch({
//     type: "clearProductState",
//   });
// };
