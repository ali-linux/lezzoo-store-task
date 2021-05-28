import { combineReducers } from "redux";
import alert from "./alert.reducer";
import { registerReducer, loginReducer } from "./auth.reducer";
import { storeReducer } from "./store.reducer";

export default combineReducers({
  alert,
  registerReducer,
  loginReducer,
  storeReducer,
});
