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
      payload: error?.response?.data?.message || error.message,
    });
  }
};
// edit product of a shop ---seller
// export const editProduct = (newForm, id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "editPrductRequest",
//     });

//     const config = { headers: { "Content-Type": "multipart/form-data" } };
//     const { data } = await axios.post(
//       `${BASE_URL}/product/eidt-product/${id}`,
//       newForm,
//       config,
//       {
//         withCredentials: true,
//       }
//     );
//     dispatch({
//       type: "editPrductSuccess",
//       payload: data.product,
//     });
//   } catch (error) {
//     dispatch({
//       type: "editPrductFail",
//       payload: error.response.data.message,
//     });
//   }
// };

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

// get a Product
export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/product/${id}`);
    dispatch({
      type: "getProductSuccess",
      payload: data.product,
    });

    console.log(payload);
  } catch (error) {
    dispatch({
      type: "getProductFailed",
      payload: error.response.data.message,
    });
  }
};
// delete Products of a shop
export const deleteShopProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteShopProductRequest",
    });

    const { data } = await axios.delete(
      `${BASE_URL}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteShopProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteShopProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products ---Admin
export const adminGetAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminGetAllProductsRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/product/admin-all-products`, {
      withCredentials: true,
    });
    dispatch({
      type: "adminGetAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "adminGetAllProductsFailed",
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
