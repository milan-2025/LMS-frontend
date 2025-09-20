import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import { useEffect, useRef, useState } from "react"
import FilterListIcon from "@mui/icons-material/FilterList"

import FilterInputComponent from "./FilterInputComponent"
import { useDispatch, useSelector } from "react-redux"
import { showAlert } from "../store/AlertSlice"
import { useMutation } from "@tanstack/react-query"
import { getFilteredLeads, queryClient } from "../util/http"
import {
  resetFilters,
  setFiltersApplied,
  setLeads,
  setPage,
  setTotalItems,
  setTotalPages,
} from "../store/leadData"
import { startLoader, stopLoader } from "../store/loaderSlice"

const LeadFilters = ({ tabValue }) => {
  const [showFilters, setShowFilters] = useState(false)

  // const [currentField, setCurrentField] = useState(null)

  const theme = useTheme()
  const [state, setState] = useState("")
  const [timeZone, setTimeZone] = useState("")
  const [commodity, setCommodity] = useState("")
  const [status, setStatus] = useState("")

  // const [stateKey, setStateKey] = useState(generateRandomKey())
  // const [timeZoneKey, setTimeZoneKey] = useState(generateRandomKey())
  // const [commodityKey, setCommodityKey] = useState(generateRandomKey())
  // const [statusKey, setStatusKey] = useState(generateRandomKey())

  const dispatch = useDispatch()
  const leadData = useSelector((state) => state.leads)

  // const dispatch = useDispatch()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: getFilteredLeads,
    retry: 0,
    onSuccess: (data) => {
      dispatch(stopLoader())
      console.log("filtered leads", data)
      dispatch(
        setLeads({
          leads: data.filteredLeads,
        })
      )
      dispatch(
        setTotalItems({
          totalItems: data.totalItems,
        })
      )
      dispatch(
        setTotalPages({
          totalPages: data.totalPages,
        })
      )
    },
  })

  if (isPending) {
    dispatch(startLoader())
    console.log("e")
  }
  if (isError) {
    dispatch(stopLoader())
    console.log("err while filter, ", error)
  }
  const handleReset = () => {
    dispatch(
      setFiltersApplied({
        filtersApplied: false,
      })
    )
    setState("")
    setCommodity("")
    setTimeZone("")
    setStatus("")
    queryClient.invalidateQueries({
      queryKey: ["leads"],
    })
    dispatch(resetFilters())

    // stateFilterRef.current.handleReset()
    // timeZoneFilterRef.current.handleReset()
    // commodityFilterRef.current.handleReset()
    // statusFilterRef.current.handleReset()
  }
  const handleApplyFilters = () => {
    if (
      state.trim().length > 0 ||
      timeZone.trim().length > 0 ||
      commodity.trim().length > 0 ||
      status.trim().length > 0
    ) {
      dispatch(
        setFiltersApplied({
          filtersApplied: true,
        })
      )
      mutate({
        state,
        timeZone,
        commodity,
        status,
        page: leadData.page,
        limit: leadData.limit,
        tabValue,
      })
    } else {
      dispatch(
        showAlert({
          isVisible: true,
          severity: "error",
          message: "select any of the values to add a filter...!!!",
        })
      )
    }
  }

  useEffect(() => {
    // console.log("fA", filtersApplied)
    if (leadData.filtersApplied) {
      mutate({
        state,
        timeZone,
        commodity,
        status,
        page: leadData.page,
        limit: leadData.limit,
        tabValue,
      })
    }
  }, [leadData.page])

  return (
    <Grid my={"1.3rem"} size={12}>
      <Button
        fullWidth
        sx={{
          justifyContent: "start",
          color: "#FFFFFF",
          // borderRadius: "7px",
          borderTopRightRadius: "7px",
          borderTopLeftRadius: "7px",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        // component={<AccordionSummary />}
        onClick={() => {
          setShowFilters((oldValue) => {
            return !oldValue
          })
        }}
        color="info"
        variant="contained"
        startIcon={
          <FilterListIcon
            sx={{
              alignSelf: "flex-start",
              marginBottom: "0.1rem",
            }}
          />
        }
      >
        {!showFilters ? "Show Filters" : "Hide Filters"}
      </Button>
      <Collapse in={showFilters}>
        <Grid
          size={12}
          bgcolor={theme.palette.secondary.main}
          // height={100}
          sx={{
            borderBottomLeftRadius: "7px",
            borderBottomRightRadius: "7px",
          }}
          p={"1rem"}
        >
          <Grid container>
            <Typography variant="h6">Add Filters</Typography>
          </Grid>
          <Grid container mt={"0.7rem"} spacing={3}>
            <FilterInputComponent
              value={state}
              setValue={setState}
              field={"state"}
              label={"Search State..."}
              key={leadData.stateKey}
              tabValue={tabValue}
            />
            <FilterInputComponent
              value={timeZone}
              setValue={setTimeZone}
              field={"timeZone"}
              key={leadData.timeZoneKey}
              label={"Search Time Zone..."}
              tabValue={tabValue}
            />
            <FilterInputComponent
              value={commodity}
              setValue={setCommodity}
              key={leadData.commodityKey}
              field={"commodity"}
              label={"Search Commodity..."}
              tabValue={tabValue}
            />
            <FilterInputComponent
              value={status}
              setValue={setStatus}
              field={"status"}
              label={"Search Status..."}
              key={leadData.statusKey}
              tabValue={tabValue}
            />
          </Grid>
          <Grid mt={"1.5rem"} container spacing={3} justifyContent={"flex-end"}>
            <Button onClick={handleReset} color="warning" variant="contained">
              Reset
            </Button>

            <Button
              onClick={handleApplyFilters}
              color="info"
              variant="contained"
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  )
}

export default LeadFilters
