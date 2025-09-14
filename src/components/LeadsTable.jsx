import {
  Grid,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material"
import { useState } from "react"
import CopyPhoneNumberModal from "./CopyPhoneNumberModal"
import ActionRow from "./ActionRow"
import { useQuery } from "@tanstack/react-query"
import { getLeads } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/AlertSlice"
import dayjs, { tz } from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

const LeadsTable = ({ tabValue }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  dayjs.extend(utc)
  dayjs.extend(timezone)

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(null)
  // const [limit, setLimit] = useState(10)
  // const [fetchedLeads, setFetchedLeads] = useState(null)
  const limit = 5
  const {
    data,
    isLoading,
    isError: isFetchLeadsError,
    error: fetchLeadsError,
  } = useQuery({
    queryKey: [
      "leads",
      {
        page: page,
        tabValue: tabValue,
      },
    ],
    queryFn: getLeads,
    staleTime: 0,
  })
  let content = <Typography variant="subtitle2">No Leads to show</Typography>
  if (isLoading) {
    dispatch(startLoader())
  }
  if (isFetchLeadsError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisile: true,
        severity: "error",
        message: fetchLeadsError.info?.error || "Error while getting leads.",
      })
    )
    content = (
      <Typography variant="subtitle2">
        {fetchLeadsError.info?.error || "Error while getting leads."}
      </Typography>
    )
  }

  let fetchedLeads = null
  if (data) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisile: true,
        severity: "success",
        message: "Leads fetched successfully.",
      })
    )
    console.log("leads", data)
    let actions = [
      "Copy Phone Number",
      "Change Status",
      "Set Follow Up",
      "Copy Email",
      "Add Email",
      "Add Phone Number",
      "Add Response",
      "Add Comment",
      "View Details",
    ]

    const timezones = [
      { name: "PST", id: "America/Los_Angeles" },
      { name: "MST", id: "America/Denver" },
      { name: "CST", id: "America/Chicago" },
      { name: "EST", id: "America/New_York" },
    ]
    const timeFormatter = (date, tZone) => {
      // console.log("date", date)
      // const convDate = new Date(date).toLocaleString("en-US", {
      //   timeZone: tZone,
      // })
      console.log("d", date)
      console.log("t", tZone)

      let str = dayjs(date)
      let convertedStr = str.tz(tZone)
      return convertedStr.format("DD-MM-YYYY hh:mm A")
      // return convDate
    }

    function checkDSTAndFormat(utcDayjs, timeZone) {
      // Map of time zones and their standard offsets in minutes
      const timeZoneMap = {
        "America/New_York": { offset: -300 }, // EST is UTC-5
        "America/Chicago": { offset: -360 }, // CST is UTC-6
        "America/Denver": { offset: -420 }, // MST is UTC-7
        "America/Los_Angeles": { offset: -480 }, // PST is UTC-8
      }

      // Get the dayjs instance for the specified time zone
      const dayjsInstance = utcDayjs.tz(timeZone)

      // Get the standard offset for this time zone
      const standardOffset = timeZoneMap[timeZone].offset

      // Get the current offset, which might be a DST offset
      const currentOffset = dayjsInstance.utcOffset()

      // console.log(`timeZone:- ${timeZone}`)

      // Check if the current offset is different from the standard offset.
      // If so, it means DST is applied.
      if (currentOffset !== standardOffset) {
        // Manually adjust the time back to the standard offset to remove DST
        return dayjsInstance
          .utcOffset(standardOffset)
          .format("DD-MM-YYYY hh:mm A")
      } else {
        // If DST is not applied, just return the formatted time
        return dayjsInstance.format("DD-MM-YYYY hh:mm A")
      }
    }

    fetchedLeads = data.leads.map((lead) => {
      let selectedTzone = timezones.find((item) => {
        return (
          item.name.toLocaleLowerCase() == lead.timeZone.toLocaleLowerCase()
        )
      }).id
      return {
        _id: lead._id,
        company: lead.shipper,
        state: lead.state,
        timeZone: lead.timeZone,
        commodity: lead.commodity,
        status: lead.status,
        date:
          tabValue == "Follow Ups"
            ? dayjs(lead.date).tz(selectedTzone).format("DD-MM-YYYY hh:mm A")
            : null,
        actions: actions,
      }
    })
    if (tabValue != "Follow Ups") {
      fetchedLeads.forEach((lead) => {
        delete lead.date
      })
    }
    // console.log("fl", formatedLeads)
    // setFetchedLeads(formatedLeads)
  }

  return (
    <>
      {fetchedLeads && (
        <TableContainer
          sx={{
            borderRadius: "25px",
            // borderTopRightRadius: "25px",
            marginTop: "1.5rem",
            boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
            "&::-webkit-scrollbar": {
              height: 8, // Adjust height for horizontal scrollbar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: (theme) => theme.palette.text.main,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: 2,
            },

            // padding: "1rem",
          }}
        >
          <Table
            sx={{
              minWidth: 650,
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "secondary.main",
                  color: theme.palette.text.main,
                  whiteSpace: "nowrap",
                }}
              >
                <TableCell
                  sx={{
                    paddingLeft: "3rem",
                  }}
                >
                  Company
                </TableCell>
                {/* <TableCell>Address</TableCell> */}
                <TableCell sx={{ whiteSpace: "nowrap" }}>State</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Time Zone</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>Commodity</TableCell>

                <TableCell sx={{ whiteSpace: "nowrap" }}>Status</TableCell>
                {tabValue == "Follow Ups" && (
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    Follow Up Date
                  </TableCell>
                )}
                <TableCell sx={{ whiteSpace: "nowrap" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fetchedLeads.map((lead, rowIndex) => {
                // if(index == 5){
                //   return <ActionRow key={lead._id} leadId = {lead._id} />
                // }
                return (
                  <TableRow
                    key={lead._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {Object.values(lead).map((val, colIndex) => {
                      if (colIndex == 0) {
                      } else if (colIndex == Object.values(lead).length - 1) {
                        return (
                          <TableCell
                            sx={{ whiteSpace: "nowrap" }}
                            key={val + colIndex}
                          >
                            <ActionRow
                              lead={data.leads.find(
                                (mylead) => mylead._id == lead._id
                              )}
                              actions={val}
                            />
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell
                            sx={{
                              whiteSpace: "nowrap",
                              color:
                                tabValue == "Follow Ups" && colIndex == 6
                                  ? "error.light"
                                  : "",
                            }}
                            key={val + colIndex}
                          >
                            {val}
                          </TableCell>
                        )
                      }
                    })}
                  </TableRow>
                )
              })}
              <TableRow></TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {fetchedLeads && (
        <Grid mb={"3rem"} justifyContent={"center"} container mt={"2rem"}>
          <Pagination
            count={data.totalPages}
            page={page}
            onChange={(e, changedPage) => {
              console.log("cp", changedPage)
              setPage(changedPage)
            }}
            color="primary"
          />
        </Grid>
      )}
    </>
  )
}

export default LeadsTable
