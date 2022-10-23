import axios from "axios";
import get from "lodash.get";
import { toast } from "react-toastify";

import { getWishListState } from "./wishlist_actions";

export const markAsRead = (book) => {
  return async function (dispatch, getState) {
    try {
      let state = getState();
      let user_id = get(state, "user.id", null);
      let book_id = get(book, "wish_val.book.id", null);

      await axios.post(`${process.env.REACT_APP_SERVER_HOST}/readings`, {
        reading: {
          user_id,
          book_id,
        },
      });
      dispatch(getWishListState());
    } catch (e) {
      toast.error(`Error: ${e.code}`);
    }
  };
};

export const unmarkAsRead = (book) => {
  return async function (dispatch, getState) {
    try {
      let reading_id = get(book, "wish_val.readings.0.id", null);
      await axios.delete(
        `${process.env.REACT_APP_SERVER_HOST}/readings/${reading_id}`
      );
      dispatch(getWishListState());
    } catch (e) {
      toast.error(`Error: ${e.code}`);
    }
  };
};

export const searchReadingsForBook = (book_search_term) => {
  return async function (dispatch, getState) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}/search_readings`,
        {
          query: {
            book_search_term: book_search_term,
          },
        }
      );

      const readings = response.data || [];

      dispatch(setReadingsHistory(readings));
    } catch (e) {
      toast.error(`Error: ${e.code}`);
    }
  };
};

export const setReadingsHistory = (readings) => ({
  type: "setReadingsHistory",
  payload: readings,
});
