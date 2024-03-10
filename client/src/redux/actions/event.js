import axios from "axios";
import { BASE_URL } from "../../config";

// create Event
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
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "createEventFail",
      payload: error.response.data.message,
    });
  }
};

// get All Events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsShopRequest",
    });

    const { data } = await axios.get(
      `${BASE_URL}/event/all-events-shop/${id}`,
      {
        withCredentials: true,
      }
    );
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
// delete Events of a shop
export const deleteShopEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteShopEventRequest",
    });

    const { data } = await axios.delete(
      `${BASE_URL}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );
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

// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/event/get-all-events`);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFailed",
      payload: error.response.data.message,
    });
  }
};

// get all events ---Admin
export const adminGetAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminGetAllEventsRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/event/admin-all-events`, {
      withCredentials: true,
    });
    dispatch({
      type: "adminGetAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "adminGetAllEventsFailed",
      payload: error.response.data.message,
    });
  }
};


// Action to clear event creation state
// export const clearProductState = () => (dispatch) => {
//   dispatch({
//     type: "clearProductState",
//   });
// };
