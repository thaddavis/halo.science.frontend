import axios from "axios";
import get from "lodash.get";
import { showError } from "../../utility/showError";

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
      showError(e);
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
      showError(e);
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
      showError(e);
    }
  };
};

export const getFirstOwners = () => {
  return async function (dispatch, getState) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/first_owners`
      );

      const firstOwners = response.data || [];

      dispatch(setFirstOwners(firstOwners));
    } catch (e) {
      showError(e);
    }
  };
};

export const getGenreStats = (genre) => {
  console.log("genre", genre);

  return async function (dispatch, getState) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/genre_stats/${genre}`
      );

      const genreStats = response.data;

      console.log("___ _*_*_ ___", genreStats);

      dispatch(setGenreStats(genreStats));
    } catch (e) {
      showError(e);
    }
  };
};

export const setFirstOwners = (firstOwners) => ({
  type: "setFirstOwners",
  payload: firstOwners,
});

export const setReadingsHistory = (readings) => ({
  type: "setReadingsHistory",
  payload: readings,
});

export const setGenreStats = (genreStats) => ({
  type: "setGenreStats",
  payload: genreStats,
});
