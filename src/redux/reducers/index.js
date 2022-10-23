import { combineReducers } from "redux";
import { counter } from "./counter_reducer";
import { wishlist } from "./wishlist_reducer";
import { user } from "./user_reducer";
import { book } from "./book_reducer";

const rootReducer = combineReducers({
  book,
  counter,
  user,
  wishlist,
});

export default rootReducer;
