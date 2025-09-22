import { Button, Grid, Typography } from "@mui/material"
import LeadInformation from "../components/LeadInformation"

const ViewLeadDetails = () => {
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid my={"2rem"} size={10}>
          <LeadInformation />
        </Grid>
      </Grid>
    </>
  )
}

export default ViewLeadDetails
