import axios from "axios";
import get from "lodash.get";
import { showError } from "../../utility/showError";

import { getWishListState } from "./wishlist_actions";

import { SET_USER } from '../constants/ActionTypes'

export const giveAwayPossessions = (wishlistId, wishType, wishVal) => {
  console.log("giveAwayPossessions");
  return async function (dispatch, getState) {
    try {
      console.log("___ async ___");

      let state = getState();
      let user_id = get(state, "user.id", null);
      await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/users/give_away_possessions/${user_id}`
      );

      dispatch(getWishListState());
    } catch (e) {
      showError(e);
    }
  };
};

export const getUsers = () => {
  console.log("getUsers");
  return async function (dispatch, getState) {
    try {
      console.log("___ async ___");

      let users =await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}/users`
      );

      dispatch(setUser(users[0] || 1));
    } catch (e) {
      showError(e);
    }
  };
};

export const setUser = (user_id) => ({
  type: SET_USER,
  payload: user_id,
});