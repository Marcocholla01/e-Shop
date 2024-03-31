import axios from "axios";
import { BASE_URL } from "../../config";

// get all withdrwawals ----- Admin
export const adminGetAllWithdrawal = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminGetAllWithdrawalRequest",
    });

    const { data } = await axios.get(
      `${BASE_URL}/withdraw/get-admin-all-withdrawals`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "adminGetAllWithdrawalSuccess",
      payload: data.withdraw,
    });
  } catch (error) {
    dispatch({
      type: "adminGetAllWithdrawalFailed",
      payload: error.response.data.message,
    });
  }
};
// get all withdrwawals ----- seller
export const sellerGetAllWithdrawal = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "sellerGetAllWithdrawalRequest",
    });

    const { data } = await axios.get(
      `${BASE_URL}/withdraw/seller-all-withdrawals/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "sellerGetAllWithdrawalSuccess",
      payload: data.withdrawals,
    });
  } catch (error) {
    dispatch({
      type: "sellerGetAllWithdrawalFailed",
      payload: error.response.data.message,
    });
  }
};

// get order based on ID
export const getwithdrawalDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "withdrawalRequest",
    });

    const { data } = await axios.get(`${BASE_URL}/withdraw/withdrawal/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "withdrawalSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "withdrawalFailed",
      payload: error.response.data.message,
    });
  }
};
