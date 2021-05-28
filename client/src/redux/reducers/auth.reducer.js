import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOGOUT,
} from "../constants/auth.constants";

const registerState = {
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export const registerReducer = (state = registerState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        loading: false,
      };
    case REGISTER_FAIL:
      // localStorage.removeItem("token");
      return {
        loading: false,
      };
    default:
      return state;
  }
};
const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
const loginState = clientInfo
  ? {
      token: clientInfo.token,
      isAuthenticated: true,
      loading: false,
      userInfo: clientInfo.userInfo,
    }
  : {
      token: null,
      isAuthenticated: false,
      loading: false,
      userInfo: null,
    };

export const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("clientInfo", JSON.stringify(action.payload));
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        userInfo: action.payload.userInfo,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        userInfo: null,
      };
    default:
      return state;
  }
};
