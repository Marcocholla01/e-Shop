import axios from "axios";
import { BASE_URL } from "../../config";

// get all events ---Admin
export const adminGetAllCouponCodes = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminGetAllCouponCodesRequest",
    });

    const { data } = await axios.get(
      `${BASE_URL}/couponCode/admin-all-coupon-codes`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "adminGetAllCouponCodesSuccess",
      payload: data.couponCodes,
    });
  } catch (error) {
    dispatch({
      type: "adminGetAllCouponCodesFailed",
      payload: error.response.data.message,
    });
  }
};
// get all events
export const GetAllCouponCodes = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetAllCouponCodesRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/couponCode/all-coupon-codes`);
    dispatch({
      type: "GetAllCouponCodesSuccess",
      payload: data.couponCodes,
    });
  } catch (error) {
    dispatch({
      type: "GetAllCouponCodesFailed",
      payload: error.response.data.message,
    });
  }
};
