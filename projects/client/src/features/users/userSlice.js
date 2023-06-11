import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import CustomToast from "../../components/CustomToast/CustomToast";
import CustomToastOptions from "../../components/CustomToast/CustomToastOptions";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetuser: (state) => {
      state.user = null;
    },
  },
});

export const { setIsLoading, setUser, resetuser } = userSlice.actions;

export default userSlice.reducer;

export function registerUser(data, callback) {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      let response = await axios.post(
        "http://localhost:8000/users/register",
        data
      );

      dispatch(setUser(response.data.data));
      console.log(response);
      // Call the callback function to navigate to /verification
      if (typeof callback === "function") {
        callback();
      }
      dispatch(setIsLoading(false));
      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );
    } catch (error) {
      dispatch(setIsLoading(false));
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
    }
  };
}

export function loginUser(data, callback) {
  return async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      let response = await axios.post(
        "http://localhost:8000/users/login",
        data
      );

      dispatch(setUser(response.data));
      localStorage.setItem("user_token", response.data.token);
      localStorage.setItem("exp_token", response.data.data.expToken);
      if (typeof callback === "function") {
        callback();
      }
      dispatch(setIsLoading(false));
      toast(
        <CustomToast type="success" message={response.data.message} />,
        CustomToastOptions
      );
    } catch (error) {
      console.log(error.response);
      dispatch(setIsLoading(false));
      toast(
        <CustomToast type="error" message={error.response.data.message} />,
        CustomToastOptions
      );
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    try {
      dispatch(resetuser());
      localStorage.removeItem("user_token");
      localStorage.removeItem("exp_token");
      toast(
        <CustomToast type="warning" message="Logged out successfully" />,
        CustomToastOptions
      );
    } catch (error) {
      console.log(error);
      toast(
        <CustomToast type="error" message="Error occurred during logout" />,
        CustomToastOptions
      );
    }
  };
}
