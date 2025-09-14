import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getStoredFollowUpIds, setTopFollowUPIds } from "../util/followups"
import { getFollowUpIds } from "../util/http"

export default function AlertDialog() {
  const navigate = useNavigate()
  const handleClose = (event, reason) => {
    if ((reason && reason === "backdropClick") || reason === "escapeKeyDown") {
      return
    }
    setOpen(false)
  }
  const handleGoToFollowUp = () => {
    setOpen(false)
    navigate("/leads?followUp=true")
  }

  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const { token } = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : { token: "" }
  const { data, error } = useQuery({
    queryKey: ["leads", "followups"],
    queryFn: getFollowUpIds,
    refetchInterval: 5 * 60 * 1000,

    staleTime: 0,
    enabled: () => {
      return token ? token.length > 0 : false
    },
  })
  function areArraysEqualUnorderedIncludes(arr1, arr2) {
    // Check if lengths are the same, this is a necessary first step
    // to ensure no elements were added or removed

    if (arr1.length !== arr2.length) {
      return false
    }

    // Iterate and check for inclusion
    for (let i = 0; i < arr1.length; i++) {
      if (!arr2.includes(arr1[i])) {
        return false
      }
    }

    // If the loop completes, all elements from arr1 are in arr2
    return true
  }
  if (data) {
    let ids = getStoredFollowUpIds()

    console.log(ids, data)
    if (!areArraysEqualUnorderedIncludes(ids, data)) {
      // showAlert
      setTitle("New Due Follow Up !!!")
      setMessage(
        "A New Follow up is due for you, kindly go to follow up tab and contact the lead."
      )
      setOpen(true)
    }
    setTopFollowUPIds(data)
    // setFollowUpLength(data.len)
  }
  if (error) {
    console.log("errrr", error)
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleGoToFollowUp}
            autoFocus
          >
            Go To Follow Up's
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
