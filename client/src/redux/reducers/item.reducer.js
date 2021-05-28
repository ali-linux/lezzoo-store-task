import {
  ADD_ITEM_FAIL,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  GET_ITEMS_FAIL,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEM_FAIL,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  UPDATE_ITEM_REQUEST,
  UPDATE_ITEM_SUCCESS,
} from "../constants/item.constants";

const initialState = {
  loading: false,
  items: [],
  item: {},
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ITEM_REQUEST:
    case ADD_ITEM_REQUEST:
    case DELETE_ITEM_REQUEST:
    case GET_ITEM_REQUEST:
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ITEM_FAIL:
    case ADD_ITEM_FAIL:
    case DELETE_ITEM_FAIL:
    case GET_ITEM_FAIL:
    case GET_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.result,
      };
    case GET_ITEM_SUCCESS:
      return {
        loading: false,
        items: [],
        item: action.payload,
      };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload.item],
      };
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};
