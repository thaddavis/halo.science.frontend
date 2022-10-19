import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { useSelector, useDispatch } from "react-redux";

const finalCreateStore = compose(applyMiddleware(thunk))(createStore);

export function configureStore(initialState) {
  // return finalCreateStore(rootReducer, initialState);
  return createStore(rootReducer, applyMiddleware(thunk));
}
