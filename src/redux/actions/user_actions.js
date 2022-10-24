import axios from "axios";
import get from "lodash.get";
import { showError } from "../../utility/showError";

import { getWishListState } from "./wishlist_actions";

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
