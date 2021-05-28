import {
  ADD_CATEGORY_FAIL,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES_FAIL,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from "../constants/category.constants";

const initialState = {
  categories: [],
  category: {},
  loading: false,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_REQUEST:
    case ADD_CATEGORY_REQUEST:
    case DELETE_CATEGORY_REQUEST:
    case GET_CATEGORY_REQUEST:
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CATEGORY_FAIL:
    case ADD_CATEGORY_FAIL:
    case DELETE_CATEGORY_FAIL:
    case GET_CATEGORY_FAIL:
    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        loading: false,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.result,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        categories: [],
        category: action.payload,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload.Category],
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.map((category) => {
          if (category.id === action.payload.id) {
            return action.payload;
          }
          return category;
        }),
      };
    default:
      return state;
  }
};
