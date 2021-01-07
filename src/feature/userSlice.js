import { createSlice } from "@reduxjs/toolkit"
import apis from "../Apis";

export const userSlice = createSlice({
    name: "user",
    initialState: {
      user: null,
      signUpRequest: null,
      signUpSecondStep: null
    },
    reducers: {
      login: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        apis.user.logout()
        state.user = null;
      },
      signUpRequest: (state, action) => {
        state.signUpRequest = action.payload;
      },
      signUpSecondStep: (state, action) => {
        state.signUpSecondStep = action.payload;
      },

    },
  });
  
  export const { login, logout, signUpRequest, signUpSecondStep } = userSlice.actions;
  
  // The function below is called a selector and allows us to select a value from
  // the state. Selectors can also be defined inline where they're used instead of
  // in the slice file. For example: `useSelector((state) => state.user.value)`
  export const selectUser = (state) => state.user.user;
  export const selectSignupRequest = (state) => state.user.signUpRequest;
  export const selectSignupSecondStep = (state) => state.user.signUpSecondStep;
  
  export default userSlice.reducer;