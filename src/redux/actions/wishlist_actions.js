import axios from "axios";
import get from "lodash.get";
import { toast } from "react-toastify";

export const addOwnedWish = (wishlist_item) => {
  return async function (dispatch, getState) {
    try {
      console.log("addOwnedWish", wishlist_item);

      let state = getState();
      let user_id = get(state, "user.id", null);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}/owned_books`,
        {
          book_id: get(wishlist_item, "wish_val.book.id", null),
          user_id: user_id,
          wishlist_item_id: get(wishlist_item, "id", null),
        }
      );

      dispatch({
        type: "addOwnedWish",
        payload: response.data,
      });
    } catch (e) {
      toast.error(`Error: ${e.code}`);
    }
  };
};

export const removeOwnedWish = (wishlist_item) => {
  return async function (dispatch, getState) {
    try {
      console.log("removeOwnedWish", wishlist_item);

      let state = getState();
      let user_id = get(state, "user.id", null);
      let owned_id = get(wishlist_item, "owned_id", null);

      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOST}/owned_books/${owned_id}`
      );

      dispatch({
        type: "removeOwnedWish",
        payload: response.data,
      });
    } catch (e) {
      toast.error(`Error: ${e.code}`);
    }
  };
};

export const setWishListState = (state) => {
  return {
    type: "setWishListState",
    payload: state,
  };
};
