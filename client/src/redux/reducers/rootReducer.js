import { combineReducers } from "redux";
import alert from "./alert.reducer";
import { registerReducer, loginReducer } from "./auth.reducer";
import { storeReducer } from "./store.reducer";
import { categoryReducer } from "./category.reducer";
import { itemReducer } from "./item.reducer";

export default combineReducers({
  alert,
  registerReducer,
  loginReducer,
  storeReducer,
  categoryReducer,
  itemReducer,
});
