import { combineReducers } from "redux";
import { counter } from "./counter_reducer";
import { wishlist } from "./wishlist_reducer";
import { user } from "./user_reducer";

const rootReducer = combineReducers({
  counter,
  user,
  wishlist,
});

export default rootReducer;
