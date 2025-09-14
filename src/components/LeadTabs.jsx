import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const LeadTabs = ({ tabValue, setTabValue }) => {
  const tabValues = ["New", "Connected", "Not Connected", "Follow Ups"]
  const [searchParams, setSearchParams] = useSearchParams()
  if (searchParams.has("followUp")) {
    const followup = searchParams.get("followUp")
    if (followup == "true") {
      setTabValue("Follow Ups")
      setSearchParams({ followup: "false" })
    }
  }
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
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
