import {
  ADD_STORE_FAIL,
  ADD_STORE_REQUEST,
  ADD_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  GET_ALL_STORE_FAIL,
  GET_ALL_STORE_REQUEST,
  GET_ALL_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
} from "../constants/store.constants";

const storesState = {
  stores: [],
  loading: false,
};

export const storeReducer = (state = storesState, action) => {
  switch (action.type) {
    case ADD_STORE_REQUEST:
    case UPDATE_STORE_REQUEST:
    case DELETE_STORE_REQUEST:
    case GET_ALL_STORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_STORE_SUCCESS:
      return {
        loading: false,
        stores: action.payload.result,
      };
    case UPDATE_STORE_FAIL:
    case DELETE_STORE_FAIL:
    case ADD_STORE_FAIL:
    case GET_ALL_STORE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case ADD_STORE_SUCCESS:
      console.log("payload", action.payload.store);
      return {
        ...state,
        loading: false,
        stores: [...state.stores, action.payload.store],
      };
    case DELETE_STORE_SUCCESS:
      console.log("payload:", action.payload);
      return {
        ...state,
        loading: false,
        stores: state.stores.filter((store) => store.id !== action.payload),
      };
    case UPDATE_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        stores: state.stores.map((store) => {
          if (store.id === action.payload.id) {
            return action.payload;
          }
          return store;
        }),
      };
    default:
      return state;
  }
};
