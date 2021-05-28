import axios from "axios";
import { setAlert } from "../actions/alert.action";
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

export const getCategories = (store_id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATEGORIES_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.get(`/api/category/store/${store_id}`, config);
    dispatch({
      type: GET_CATEGORIES_SUCCESS,
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
      type: GET_CATEGORIES_FAIL,
    });
  }
};

export const getCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATEGORY_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.get(`/api/category/${id}`, config);
    dispatch({
      type: GET_CATEGORY_SUCCESS,
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
      type: GET_CATEGORY_FAIL,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CATEGORY_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    await axios.delete(`/api/category/delete/${id}`, config);
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
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
      type: DELETE_CATEGORY_FAIL,
    });
  }
};

export const updateCategory = (id, name, store_id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CATEGORY_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.put(
      `/api/category/update/${id}`,
      {
        name,
      },
      config
    );
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: {
        id,
        name,
        store_id,
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
      type: UPDATE_CATEGORY_FAIL,
    });
  }
};

export const addCategory = (name, store_id) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CATEGORY_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.post(
      `/api/category/store/${store_id}/add`,
      {
        name,
      },
      config
    );
    dispatch({
      type: ADD_CATEGORY_SUCCESS,
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
      type: ADD_CATEGORY_FAIL,
    });
  }
};
