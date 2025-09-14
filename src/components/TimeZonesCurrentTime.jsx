import { Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { useEffect, useState } from "react"

const TimeZonesCurrentTime = () => {
  const timezones = [
    { name: "PST", id: "America/Los_Angeles" },
    { name: "MST", id: "America/Denver" },
    { name: "CST", id: "America/Chicago" },
    { name: "EST", id: "America/New_York" },
  ]
  dayjs.extend(utc)
  dayjs.extend(timezone)
  const [pstTime, setPstTime] = useState(
    dayjs().tz(timezones[0].id).format("hh:mm A")
  )
  const [mstTime, setMstTime] = useState(
    dayjs().tz(timezones[1].id).format("hh:mm A")
  )
  const [cstTime, setCstTime] = useState(
    dayjs().tz(timezones[2].id).format("hh:mm A")
  )
  const [EstTime, setEstTime] = useState(
    dayjs().tz(timezones[3].id).format("hh:mm A")
  )

  useEffect(() => {
    let interval = setInterval(() => {
      setPstTime(dayjs().tz(timezones[0].id).format("hh:mm A"))
      setMstTime(dayjs().tz(timezones[1].id).format("hh:mm A"))
      setCstTime(dayjs().tz(timezones[2].id).format("hh:mm A"))
      setEstTime(dayjs().tz(timezones[3].id).format("hh:mm A"))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <Grid
      container
      sx={{ flexGrow: 1 }}
      // alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography color="primary" variant="body1">
        PST:{" "}
      </Typography>
      <Typography alignSelf={"center"} ml={"0.5rem"} variant="body2">
        {" "}
        {pstTime}
      </Typography>
      <Typography color="primary" ml={"1rem"} variant="body1">
        MST:{" "}
      </Typography>
      <Typography alignSelf={"center"} ml={"0.5rem"} variant="body2">
        {" "}
        {mstTime}
      </Typography>
      <Typography ml={"1rem"} color="primary" variant="body1">
        CST:{" "}
      </Typography>
      <Typography alignSelf={"center"} ml={"0.5rem"} variant="body2">
        {" "}
        {cstTime}
      </Typography>
      <Typography ml={"1rem"} color="primary" variant="body1">
        EST:{" "}
      </Typography>
      <Typography alignSelf={"center"} ml={"0.5rem"} variant="body2">
        {" "}
        {EstTime}
      </Typography>
    </Grid>
  )
}

export default TimeZonesCurrentTime
