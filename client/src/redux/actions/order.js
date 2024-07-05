import axios from "axios";
import { BASE_URL } from "../../config";

// get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersUserRequest",
    });

    const { data } = await axios.get(
      `${BASE_URL}/order/get-all-orders/${userId}`
    );

    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};

// get all orders of seller
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllOrdersShopRequest",
    });

    const { data } = await axios.get(
      `${BASE_URL}/order/get-seller-all-orders/${shopId}`
    );

    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersShopFailed",
      payload: error.response.data.message,
    });
  }
};

// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "adminAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};

// get order based on ID
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "OrderRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/order/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "OrderSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "OrderFailed",
      payload: error.response.data.message,
    });
  }
};

export const setLatestOrder = (orderData) => ({
  type: "setLatestOrder",
  payload: orderData,
});

// clear latest Order
export const clearOrder = () => (dispatch, getState) => {
  dispatch({
    type: "clearOrder",
  });

  localStorage.setItem("latestOrder", JSON.stringify([]));
};
