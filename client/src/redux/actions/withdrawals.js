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
