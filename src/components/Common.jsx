import { useDispatch, useSelector } from "react-redux"
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material"
import { hideAlert } from "../store/alertSlice"
import { useQuery } from "@tanstack/react-query"
import { getFollowUpIds } from "../util/http"
import { getStoredFollowUpIds, setTopFollowUPIds } from "../util/followups"
import { useState } from "react"

const Common = () => {
  const isLoading = useSelector((state) => state.loader.loading)
  const alertData = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(hideAlert())
  }

  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alertData.isVisible}
        autoHideDuration={6000}
        onClose={handleClose}
        key={alertData.message}
      >
        <Alert
          onClose={handleClose}
          severity={alertData.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertData.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Common
