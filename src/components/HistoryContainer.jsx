import Timeline from "@mui/lab/Timeline"
import { timelineItemClasses } from "@mui/lab/TimelineItem"
import { Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import HistoryItem from "./HistoryItem"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"
const HistoryContainer = ({ queryFn, queryKey, historyTitle }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    retry: 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  const dispatch = useDispatch()
  if (isLoading) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisible: true,
        severity: "error",
        message: error.info?.error || "Error while getting data.",
      })
    )
  }
  let mappedItems = null
  let showHistoryItems = false
  if (data) {
    dispatch(stopLoader())
    console.log("data from responses----", data)
    if (data.responses && data.responses.length > 0) {
      showHistoryItems = true
      mappedItems = data.responses.map((item) => {
        return (
          <HistoryItem
            key={item._id}
            title={item.response}
            date={item.addedAt}
          />
        )
      })
    } else if (data.comments && data.comments.length > 0) {
      showHistoryItems = true
      mappedItems = data.comments.map((item) => {
        return (
          <HistoryItem
            key={item._id}
            title={item.comment}
            date={item.addedAt}
          />
        )
      })
    }
  }

  return (
    <>
      <Grid size={12}>
        <Typography variant="body1">{historyTitle}</Typography>
      </Grid>
      <Grid size={12}>
        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {showHistoryItems ? (
            mappedItems
          ) : (
            <Typography>No Intraction To Show...!!!</Typography>
          )}
        </Timeline>
      </Grid>
    </>
  )
}

export default HistoryContainer
