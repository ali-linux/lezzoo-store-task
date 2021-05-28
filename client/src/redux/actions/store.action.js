import axios from "axios";
import { setAlert } from "../actions/alert.action";
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
  GET_STORE_FAIL,
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
} from "../constants/store.constants";

export const getStores = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_STORE_REQUEST,
    });
    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.get("/api/store/", config);
    dispatch({
      type: GET_ALL_STORE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
    dispatch({
      type: GET_ALL_STORE_FAIL,
    });
  }
};

export const addStore = (name, email, logo) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_STORE_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.post(
      "api/store/add",
      {
        name,
        email,
        logo,
      },
      config
    );
    dispatch({
      type: ADD_STORE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
    dispatch({
      type: ADD_STORE_FAIL,
    });
  }
};

export const deleteStore = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_STORE_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    await axios.delete(`api/store/delete/${id}`, config);
    dispatch({
      type: DELETE_STORE_SUCCESS,
      payload: id,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
    dispatch({
      type: DELETE_STORE_FAIL,
    });
  }
};

export const updateStore = (id, name, email, logo) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_STORE_REQUEST,
    });
    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const body = JSON.stringify({ name, email, logo });
    const { data } = await axios.put(`/api/store/update/${id}`, body, config);

    dispatch({
      type: UPDATE_STORE_SUCCESS,
      payload: {
        id,
        name,
        email,
        logo,
      },
    });
    dispatch(setAlert(data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
    dispatch({
      type: UPDATE_STORE_FAIL,
    });
  }
};

export const getStoreDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_STORE_REQUEST,
    });
    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.get(`/api/store/${id}`, config);
    dispatch({
      type: GET_STORE_SUCCESS,
      payload: data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
    dispatch({
      type: GET_STORE_FAIL,
    });
  }
};
