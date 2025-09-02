import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import loaderSlice from "./loaderSlice"
import alertSlice from "./AlertSlice"

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loader: loaderSlice.reducer,
    alert: alertSlice.reducer,
  },
})

export default store
