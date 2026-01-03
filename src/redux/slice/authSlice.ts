import { createSlice } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';




const initialState = {
  isUserLogin: false,
  token: null,
  user: null,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      AsyncStorage.removeItem('loginToken');
      state.isUserLogin = false;
      state.user = null;
      state.token = null;
      state.message = 'Logout Successfully';
    },
    login: (state, { payload }) => {
      state.isUserLogin = true;
      state.user = payload?.user;
      state.token = payload?.token;
      state.message = 'You have logged in successfully';
    },
    updateUser: (state, { payload }) => {
      console.log(state,payload)
      if (state.user) {
        
        if (payload?.user?.full_name) {
          state.user.full_name = payload.user.full_name;
        }
        if (payload?.user?.email) {
          state.user.email = payload.user.email;
        }
        if (payload?.user?.gender) {
          state.user.gender = payload.user.gender;
        }
      }
    },
  },
});

export const { logout, login, updateUser } = authSlice.actions;

export const authSelector = (state) => state.auth;

export default authSlice.reducer;
