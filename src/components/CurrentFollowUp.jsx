import { Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getFollowUPInfo } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"

const CurrentFollowUP = ({ leadId }) => {
  const dispatch = useDispatch()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "leads",
      "followup",
      {
        leadId: leadId,
      },
    ],
    queryFn: getFollowUPInfo,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 0,
  })

  if (isLoading) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisible: true,
        severity: "error",
        message: error.info?.erro || "Error while getting follow up info.",
      })
    )
  }
  if (data) {
    dispatch(stopLoader())
    console.log("data of follow up----", data)
  }

  return (
    <Grid size={12} textAlign={"center"}>
      <Typography color="text.main" variant="body2">
        Current Follow Up
      </Typography>
      <Typography variant="body2">abcd</Typography>
    </Grid>
  )
}

export default CurrentFollowUP
