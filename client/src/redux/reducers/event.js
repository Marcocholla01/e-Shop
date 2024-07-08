import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  events: [],
};

export const eventReducer = createReducer(initialState, {
  createEventRequest: (state) => {
    state.isLoading = true;
  },
  createEventSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
    state.isEvent = true;
  },
  createEventFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isEvent = false;
  },

  // get all events of shop
  getAllEventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAllEventsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete events of shop
  deleteShopEventRequest: (state) => {
    state.isLoading = true;
  },
  deleteShopEventSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteShopEventFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all events
  getAlleventsRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAlleventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all Events -----Admin
  adminGetAllEventsRequest: (state) => {
    state.adminEventsloading = true;
  },
  adminGetAllEventsSuccess: (state, action) => {
    state.adminEventsloading = false;
    state.adminEvents = action.payload;
  },
  adminGetAllEventsFailed: (state, action) => {
    state.adminEventsloading = false;
    state.error = action.payload;
  },

  // clearEventState: (state) => {
  //   // Add any necessary state clearing logic here
  //   state.event = null;
  //   state.isEvent = false;
  //   state.error = null;
  // },

  clearErrors: (state) => {
    state.error = null;
  },
});
