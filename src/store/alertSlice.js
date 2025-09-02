import { createSlice } from "@reduxjs/toolkit"

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    isVisible: false,
    severity: "",
    message: "",
  },
  reducers: {
    showAlert: (state, action) => {
      state.isVisible = true
      state.severity = action.payload.severity
      state.message = action.payload.message
    },
    hideAlert: (state) => {
      state.isVisible = false
      ;(state.severity = ""), (state.message = "")
    },
  },
})

export default alertSlice
export const { showAlert, hideAlert } = alertSlice.actions
