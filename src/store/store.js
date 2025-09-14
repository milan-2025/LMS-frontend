import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import loaderSlice from "./loaderSlice"
import alertSlice from "./AlertSlice"
import leadActionSlice from "./leadActionSlice"

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loader: loaderSlice.reducer,
    alert: alertSlice.reducer,
    leadAction: leadActionSlice.reducer,
  },
})

export default store
