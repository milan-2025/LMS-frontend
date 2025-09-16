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
import { useState } from "react"
import FilterListIcon from "@mui/icons-material/FilterList"
import { useFormValues } from "../hooks/useFormValues"
import { useQuery } from "@tanstack/react-query"
import { getFilteredOptions } from "../util/http"
import { isNotEmpty } from "../util/validation"
import FilterInputComponent from "./FilterInputComponent"

const LeadFilters = () => {
  const [showFilters, setShowFilters] = useState(false)

  const [currentField, setCurrentField] = useState(null)

  const theme = useTheme()
  const [state, setState] = useState("")
  const [timeZone, setTimeZone] = useState("")
  const [commodity, setCommodity] = useState("")
  const [status, setStatus] = useState("")

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
          height={100}
          sx={{
            borderBottomLeftRadius: "7px",
            borderBottomRightRadius: "7px",
          }}
          p={"1rem"}
        >
          <Grid container spacing={2}>
            <FilterInputComponent
              value={state}
              setValue={setState}
              field={"state"}
              label={"Search State..."}
            />
            <FilterInputComponent
              value={timeZone}
              setValue={setTimeZone}
              field={"timeZone"}
              label={"Search Time Zone..."}
            />
            <FilterInputComponent
              value={commodity}
              setValue={setCommodity}
              field={"commodity"}
              label={"Search Commodity..."}
            />
            <FilterInputComponent
              value={status}
              setValue={setStatus}
              field={"status"}
              label={"Search Status..."}
            />
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  )
}

export default LeadFilters
