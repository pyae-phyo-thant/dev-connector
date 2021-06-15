import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    if (localStorage.token) {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } else {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        Array.prototype.forEach.call(errors, (error) =>
          dispatch(setAlert(error.msg, "danger"))
        );
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth/login", body, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        Array.prototype.forEach.call(errors, (error) =>
          dispatch(setAlert(error.msg, "danger"))
        );
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//Logout
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
