// add to cart
export const addToCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: `addToCart`,
    payload: data,
  });
  localStorage.setItem(`CartItems`, JSON.stringify(getState().cart.cart));
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: `removeFromCart`,
    payload: data._id,
  });
  localStorage.setItem(`CartItems`, JSON.stringify(getState().cart.cart));
  return data;
};

// clear cart
export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: "clearCart",
  });

  // Optionally, you can update the local storage or perform other side effects here
  localStorage.setItem("CartItems", JSON.stringify([]));
};
