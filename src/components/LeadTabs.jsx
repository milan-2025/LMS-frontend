import { Box, Tab, Tabs } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { resetFilters, setFiltersApplied, setPage } from "../store/leadData"

const LeadTabs = ({ tabValue, setTabValue }) => {
  const tabValues = ["New", "Follow Ups"]
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    if (searchParams.has("followUp")) {
      const followup = searchParams.get("followUp")
      if (followup == "true") {
        setTabValue("Follow Ups")
        setSearchParams({ followup: "false" })
      }
    }
  }, [])
  const dispatch = useDispatch()
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
    dispatch(
      setPage({
        page: 1,
      })
    )
    dispatch(
      setFiltersApplied({
        filtersApplied: false,
      })
    )
    dispatch(resetFilters())
  }
  return (
    <>
      <Box sx={{ width: "100%", marginTop: "1.5rem" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="lab API tabs example"
        >
          {tabValues.map((tv) => {
            return <Tab label={tv} value={tv} key={tv} />
          })}
        </Tabs>
      </Box>
    </>
  )
}

export default LeadTabs
