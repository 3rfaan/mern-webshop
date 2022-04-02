import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, navigate, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    navigate("/login");
  } catch (error) {
    dispatch(registerFailure());
  }
};

export const update = async (dispatch, id, token, user) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);

    res.data.accessToken = token;
    dispatch(updateSuccess(res.data));
  } catch (error) {
    dispatch(updateFailure());
  }
};
