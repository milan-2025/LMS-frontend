import { Button, Grid, Modal, Typography } from "@mui/material"
import DateTimeModal from "./DateTimeModal"
import { CalendarIcon, DateCalendar, DigitalClock } from "@mui/x-date-pickers"
import { useState } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { useFormValues } from "../hooks/useFormValues"
import dayjs from "dayjs"
// var utc = require("dayjs/plugin/utc")
// var timezone = require("dayjs/plugin/timezone")
import utc from "dayjs/plugin/utc"
import timezonePlugin from "dayjs/plugin/timezone"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import WatchLaterIcon from "@mui/icons-material/WatchLater"
import { useDispatch } from "react-redux"
import { showAlert } from "../store/AlertSlice"
import { useMutation } from "@tanstack/react-query"
import { addFollowUp } from "../util/http"
import { startLoader, stopLoader } from "../store/loaderSlice"

const SetFollowUpModal = ({ openModal, setOpenModal, timeZone, leadId }) => {
  const timezones = [
    { name: "PST", id: "America/Los_Angeles" },
    { name: "MST", id: "America/Denver" },
    { name: "CST", id: "America/Chicago" },
    { name: "EST", id: "America/New_York" },
  ]
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  }

  const openDateSelector = () => {
    setOpenDateModal(true)
  }
  const openTimeSelector = () => {
    setOpenTimeModal(true)
  }
  const [openDateModal, setOpenDateModal] = useState(false)
  const [openTimeModal, setOpenTimeModal] = useState(false)

  const [date, setDate] = useState(null)

  const [time, setTime] = useState(null)
  const [canSelectTime, setCanSelectTime] = useState(false)

  dayjs.extend(utc)
  dayjs.extend(timezonePlugin)
  const selectedTimezone = timezones.find((timeZ) => {
    return timeZ.name.toLowerCase() == timeZone.toLowerCase()
  }).id
  //   const [minTime, setMinTime] = useState(dayjs().tz(selectedTimezone))
  const shouldDisableDate = (date) => {
    if (selectedTimezone) {
      const todayInTimezone = dayjs().tz(selectedTimezone).startOf("day")
      return date.isBefore(todayInTimezone, "day")
    } else {
      const today = dayjs().startOf("day")
      return date.isBefore(today, "day")
    }
  }

  const currentTimezone = dayjs().tz(selectedTimezone)
  let isTodayInTimezone = null
  if (date) {
    isTodayInTimezone = date.isSame(currentTimezone, "day")
  }
  const minTime = isTodayInTimezone ? currentTimezone : null

  const dispatch = useDispatch()

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: addFollowUp,
    retry: 0,
    onSuccess: (data) => {
      dispatch(stopLoader())
      dispatch(
        showAlert({
          isVisible: true,
          severity: "success",
          message: "Follow up setted successfully.",
        })
      )
    },
  })

  const setFollowUp = () => {
    if (date && time) {
      console.log("selected date: ", date.toISOString())
      console.log("selected time: ", time.toISOString())
      console.log("time", time)
      let combinedDate = date
        .hour(time.hour())
        .minute(time.minute())
        .second(time.second())
      console.log(
        "combined date:-",
        combinedDate.tz(selectedTimezone).toISOString()
      )
      combinedDate = combinedDate.tz(selectedTimezone).toISOString()
      mutate({
        date: combinedDate,
        leadId: leadId,
        timeZone: timeZone,
      })
      setDate(null)
      setTime(null)
      setCanSelectTime(false)
      setOpenModal(false)
    } else {
      dispatch(
        showAlert({
          isVisible: true,
          severity: "error",
          message: "Add date and time for follow up.",
        })
      )
    }
  }
  if (isPending) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisible: true,
        severity: "error",
        message: error.info?.error || "Error while setting follow up.",
      })
    )
  }

  return (
    <>
      <Modal
        open={openModal}
        //   onClose={handleClose}
        aria-labelledby="modal-modal-copy-phone-number"
        aria-describedby="modal-modal-description"
      >
        <Grid
          container
          // size={{
          //   xs: 10,
          //   md: 6,
          // }}
          // maxHeight={"70vh"}
          sx={style}

          // justifyContent={"center"}
        >
          <Grid container size={12}>
            <Typography m={0} flexGrow={1} variant="h6">
              Set Follow Up
            </Typography>
            <CloseIcon
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                setOpenModal(false)
              }}
            />
          </Grid>
          <Grid mt={"1rem"} container justifyContent={"center"} size={12}>
            <Grid size={11} mb={"0.5rem"} textAlign={"left"}>
              <Typography variant="subtitle1">Time Zone: {timeZone}</Typography>
            </Grid>
            {/* <PhoneNumberDisplay phoneNumber={phoneNumber} comment={"Default"} /> */}

            <Grid container justifyContent={"space-between"} size={11}>
              <Grid size={5}>
                <Button
                  onClick={openDateSelector}
                  color="primary"
                  variant="contained"
                  fullWidth
                  endIcon={<CalendarIcon />}
                >
                  {date ? date.format("DD/MM/YYYY") : "Set Date"}
                </Button>
              </Grid>
              <Grid size={5} textAlign={"end"}>
                <Button
                  onClick={openTimeSelector}
                  color="primary"
                  variant="contained"
                  fullWidth
                  disabled={!canSelectTime}
                  endIcon={<WatchLaterIcon />}
                >
                  {time ? time.format("hh:mm a") : "Set Time"}
                </Button>
              </Grid>
            </Grid>
            <Grid container mt={"1.5rem"} size={11}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  setFollowUp()
                }}
              >
                {" "}
                Set Follow Up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
      <DateTimeModal
        openDateTime={openDateModal}
        setOpenDateTime={setOpenDateModal}
      >
        <DateCalendar
          //   value={selectedDate}
          onChange={(newDate) => {
            setDate(newDate)
            // setFormattedDate(newDate.format('DD/MM/YYYY'))
            // setMinTime(dayjs(newDate.toString()).tz(selectedTimezone))
            setCanSelectTime(true)

            // console.log("date:", newDate)
          }}
          shouldDisableDate={shouldDisableDate}
        />
        <Grid size={12} container justifyContent={"space-between"}>
          <Button
            onClick={() => {
              setDate(null)
              setCanSelectTime(false)
              setOpenDateModal(false)
              setTime(null)
            }}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenDateModal(false)
            }}
            disabled={!date}
            variant="contained"
            color="primary"
          >
            Ok
          </Button>
        </Grid>
      </DateTimeModal>
      <DateTimeModal
        openDateTime={openTimeModal}
        s
        setOpenDateTime={setOpenTimeModal}
      >
        {/* <Grid size={12} container justifyContent={"end"}>
          <CloseIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              //   setTime(false)
              setOpenTimeModal(false)
            }}
          />
        </Grid> */}
        <Grid size={12} mb={"1.5rem"} maxHeight={"50vh"}>
          <DigitalClock
            onChange={(newTime) => {
              setTime(newTime)

              console.log("nt", newTime.hour())
            }}
            minTime={minTime}
            ampm={true}
          />
        </Grid>
        <Grid size={12} container justifyContent={"space-between"}>
          <Button
            onClick={() => {
              //   setDate(null)
              //   setCanSelectTime(false)
              //   setOpenDateModal(false)
              setTime(null)
              setOpenTimeModal(null)
            }}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenTimeModal(false)
            }}
            disabled={!time}
            variant="contained"
            color="primary"
          >
            Ok
          </Button>
        </Grid>
      </DateTimeModal>
    </>
  )
}

export default SetFollowUpModal
