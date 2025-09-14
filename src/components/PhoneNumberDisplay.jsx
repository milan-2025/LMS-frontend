import { Grid, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { showAlert } from "../store/AlertSlice"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import leadActionSlice, { addLeadAction } from "../store/leadActionSlice"

const PhoneNumberDisplay = ({ phoneNumber, comment, leadId, isEmail }) => {
  const dispatch = useDispatch()
  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      dispatch(
        addLeadAction({
          leadId: leadId,
          name: !isEmail ? "Copy Phone Number" : "Copy Email",
          isCompleted: true,
        })
      )
      dispatch(
        showAlert({
          isVisisble: true,
          severity: "success",
          message: !isEmail ? "Phone number copied." : "Email Copied.",
        })
      )
    } catch (err) {
      console.error("Failed to copy text: ", err)
      dispatch(
        showAlert({
          isVisisble: true,
          severity: "error",
          message: "Error while copying.",
        })
      )
    }
  }

  return (
    <Grid
      p={"0.7rem"}
      my={"1rem"}
      borderRadius={"15px"}
      bgcolor={"secondary.main"}
    >
      <Grid container>
        <Typography m={0} flexGrow={1} variant="subtitle1">
          {phoneNumber}
        </Typography>
        <Grid
          mt={"0.3rem"}
          sx={{
            cursor: "pointer",
          }}
          onClick={copyPhoneNumber}
        >
          <ContentCopyIcon />{" "}
          <Typography
            m={0}
            sx={{
              verticalAlign: "top",
            }}
            variant="caption"
          >
            Copy
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="caption">{comment}</Typography>
    </Grid>
  )
}

export default PhoneNumberDisplay
