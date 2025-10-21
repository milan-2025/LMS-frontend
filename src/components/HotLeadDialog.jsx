import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { queryClient, removeHotLead } from "../util/http"
import { data } from "react-router-dom"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"

const HotLeadDialog = ({
  open,
  handleClose,
  shipper,
  leadId,
  setIsHotLead,
}) => {
  const handleRemoveClicked = () => {
    mutate({
      leadId: leadId,
    })
  }
  const dispatch = useDispatch()
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: removeHotLead,
    retry: 0,
    onSuccess: (data) => {
      handleClose()
      queryClient
        .invalidateQueries({
          queryKey: ["leads"],
        })
        .then(() => {
          setIsHotLead(false)
          dispatch(stopLoader())
          dispatch(
            showAlert({
              isVisisble: true,
              severity: "success",
              message: `${shipper} removed from Hot Leads.`,
            })
          )
        })
    },
  })

  if (isPending) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisisble: true,
        severity: "error",
        message: error.info?.error || "Error while removing hot lead.",
      })
    )
    reset()
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove Lead ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure You want to remove {shipper} from Hot Leads.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleRemoveClicked}
            // autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default HotLeadDialog
