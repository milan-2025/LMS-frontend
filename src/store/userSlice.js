import { createSlice } from "@reduxjs/toolkit"
import {
  handleLocalStorageLogin,
  handleLocalStorageLogout,
} from "../util/authentication"

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    expirationTime: null,
  },
  reducers: {
    handleLogin: (state, action) => {
      state.token = action.payload.token
      state.expirationTime = action.payload.expirationTime
      console.log("action", action)
      handleLocalStorageLogin(
        action.payload.token,
        action.payload.expirationTime
      )
    },
    handleLogout: (state) => {
      state.token = null
      state.expirationTime = null
      handleLocalStorageLogout()
    },
  },
})

export default userSlice
export const { handleLogin, handleLogout } = userSlice.actions
