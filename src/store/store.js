import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import loaderSlice from "./loaderSlice"
import alertSlice from "./AlertSlice"
import leadActionSlice from "./leadActionSlice"
import leadDataSlice from "./leadData"

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loader: loaderSlice.reducer,
    alert: alertSlice.reducer,
    leadAction: leadActionSlice.reducer,
    leads: leadDataSlice.reducer,
  },
})

export default store
