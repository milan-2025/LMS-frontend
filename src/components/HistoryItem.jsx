import TimelineItem from "@mui/lab/TimelineItem"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import { Typography } from "@mui/material"
import dayjs from "dayjs"

const HistoryItem = ({ title, date }) => {
  return (
    <TimelineItem>
      <TimelineSeparator
        // sx={{ borderColor: theme.palette.primary.main }}
        color="primary"
      >
        <TimelineDot color="primary" />
        <TimelineConnector
          // sx={{ borderColor: theme.palette.primary.main }}
          color="primary"
        />
      </TimelineSeparator>
      <TimelineContent
      // sx={{ borderColor: theme.palette.primary.main }}
      >
        <Typography variant="body1">{title}</Typography>
        <Typography color="text.main" variant="body2">
          Added at - {dayjs(date).format("DD-MM-YYYY hh:mm A")}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  )
}

export default HistoryItem
