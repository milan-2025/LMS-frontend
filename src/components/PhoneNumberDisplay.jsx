import { Grid, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { showAlert } from "../store/AlertSlice"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"

const PhoneNumberDisplay = ({ phoneNumber, comment }) => {
  const dispatch = useDispatch()
  const copyPhoneNumber = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber)
      dispatch(
        showAlert({
          isVisisble: true,
          severity: "success",
          message: "Phone number copied.",
        })
      )
    } catch (err) {
      console.error("Failed to copy text: ", err)
      dispatch(
        showAlert({
          isVisisble: true,
          severity: "error",
          message: "Error while copying phone number.",
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
