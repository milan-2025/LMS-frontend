import { Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getFollowUPInfo } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"
import dayjs, { tz } from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { getStoredFollowUpIds } from "../util/followups"

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
  let selectedTzone = ""
  let isFollowupDue = false
  if (data) {
    dispatch(stopLoader())
    console.log("data of follow up----", data)
    if (data.followup) {
      const timezones = [
        { name: "PST", id: "America/Los_Angeles" },
        { name: "MST", id: "America/Denver" },
        { name: "CST", id: "America/Chicago" },
        { name: "EST", id: "America/New_York" },
      ]
      selectedTzone = timezones.find((item) => {
        return (
          item.name.toLocaleLowerCase() ==
          data.followup.timeZone.toLocaleLowerCase()
        )
      }).id

      let followupIds = getStoredFollowUpIds()
      if (followupIds.includes(data.followup.lead)) {
        isFollowupDue = true
      }
    }
  }

  return (
    <Grid size={12} textAlign={"center"}>
      <Typography mb={"0.7rem"} color="text.main" variant="body1">
        Follow Up On
      </Typography>
      {data && data.followup ? (
        <Typography
          color={isFollowupDue ? "error.light" : "primary"}
          variant="body2"
        >
          {dayjs(data.followup.date)
            .tz(selectedTzone)
            .format("DD-MM-YYYY hh:mm A")}
          <span style={{ paddingLeft: "0.7rem" }}>
            {data.followup.timeZone.toUpperCase()}
          </span>
        </Typography>
      ) : (
        <Typography variant="body2">Not Set</Typography>
      )}
    </Grid>
  )
}

export default CurrentFollowUP
