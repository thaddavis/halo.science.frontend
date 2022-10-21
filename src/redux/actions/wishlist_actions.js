import axios from "axios";
import get from "lodash.get";

export const addOwnedBook = (wishlist_item) => {
  return async function (dispatch, getState) {
    let state = getState();
    let user_id = get(state, "user.id", null);

    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_HOST}/owned_books`,
      {
        book_id: wishlist_item.book_id,
        user_id: user_id,
        wishlist_item_id: wishlist_item.id,
      }
    );

    dispatch({
      type: "addOwnedBook",
      payload: response.data,
    });
  };
};

export const setWishListState = (state) => {
  return {
    type: "setWishListState",
    payload: state,
  };
};
