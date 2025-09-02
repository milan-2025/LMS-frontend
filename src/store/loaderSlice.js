import { createSlice } from "@reduxjs/toolkit"

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    startLoader: (state) => {
      state.loading = true
    },
    stopLoader: (state) => {
      state.loading = false
    },
    // setLoader: (state, action) => {
    //   state.loading = action.payload.loading
    // },
  },
})

export default loaderSlice
export const { startLoader, stopLoader } = loaderSlice.actions
