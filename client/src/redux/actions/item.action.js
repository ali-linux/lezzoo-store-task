import axios from "axios";
import { setAlert } from "../actions/alert.action";
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

export const getItems = (store_id, category_id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.get(
      `/api/item/store/${store_id}/category/${category_id}`,
      config
    );
    dispatch({
      type: GET_ITEMS_SUCCESS,
      payload: data,
    });
    console.log(data);
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
      type: GET_ITEMS_FAIL,
    });
  }
};

export const addItem =
  (name, image, price, stock, category_id, store_id) => async (dispatch) => {
    try {
      dispatch({
        type: ADD_ITEM_REQUEST,
      });

      const token = JSON.parse(localStorage.getItem("clientInfo")).token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const { data } = await axios.post(
        `/api/item/store/${store_id}/category/${category_id}/add`,
        {
          name,
          image,
          price,
          stock,
          category_id,
          store_id,
        },
        config
      );
      dispatch({
        type: ADD_ITEM_SUCCESS,
        payload: data,
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
        type: ADD_ITEM_FAIL,
      });
    }
  };

export const deleteItem = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_ITEM_REQUEST,
    });

    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    await axios.delete(`/api/item/delete/${id}`, config);
    dispatch({
      type: DELETE_ITEM_SUCCESS,
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
      type: DELETE_ITEM_FAIL,
    });
  }
};

export const updateItem =
  (id, name, image, price, stock, store_id, category_id) =>
  async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ITEM_REQUEST,
      });
      const token = JSON.parse(localStorage.getItem("clientInfo")).token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      };
      const body = JSON.stringify({ name, image, price, stock });
      const { data } = await axios.put(`/api/item/update/${id}`, body, config);

      dispatch({
        type: UPDATE_ITEM_SUCCESS,
        payload: {
          id,
          name,
          image,
          price,
          stock,
          category_id,
          store_id,
        },
      });
      dispatch(setAlert(data.msg, "success"));
    } catch (err) {
      console.log(err.response.data);
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((err) => {
          dispatch(setAlert(err.msg, "danger"));
        });
      } else {
        dispatch(setAlert(err.response.data.msg, "danger"));
      }
      dispatch({
        type: UPDATE_ITEM_FAIL,
      });
    }
  };

export const getItemDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ITEM_REQUEST,
    });
    const token = JSON.parse(localStorage.getItem("clientInfo")).token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const { data } = await axios.get(`/api/ITEM/${id}`, config);
    dispatch({
      type: GET_ITEM_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (err) {
    console.log(err.response.data);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    } else {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
    dispatch({
      type: GET_ITEM_FAIL,
    });
  }
};
