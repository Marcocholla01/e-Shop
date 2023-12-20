import axios from "axios";
import { BASE_URL } from "../../config";

// create product
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "createEventRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${BASE_URL}/event/create-event`,
      newForm,
      config,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "createEventSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "createEventFail",
      payload: error.response.data.message,
    });
  }
};

// get All Products of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });

    const { data } = await axios.get(`/events/all-events-shop/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailed",
      payload: error.response.data.message,
    });
  }
};
// delete Products of a shop
export const deleteShopEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteShopEventRequest",
    });

    const { data } = await axios.delete(`/event/delete-shop-event/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "deleteShopEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteShopEventFailed",
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
