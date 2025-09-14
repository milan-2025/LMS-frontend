import { Button, Collapse, Grid, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import FilterListIcon from "@mui/icons-material/FilterList"

const LeadFilters = () => {
  const [showFilters, setShowFilters] = useState(false)
  const theme = useTheme()

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
          <Grid container></Grid>
        </Grid>
      </Collapse>
    </Grid>
  )
}

export default LeadFilters
