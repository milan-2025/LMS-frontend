import { Button, Grid, Typography } from "@mui/material"
import LeadInformation from "../components/LeadInformation"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getLeadInfoById } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"

import SetFollowUp from "../components/SetFollowUP"
import CurrentFollowUP from "../components/CurrentFollowUp"

const ViewLeadDetails = () => {
  const { leadId } = useParams()

  const dispatch = useDispatch()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "leads",
      {
        leadId: leadId,
      },
    ],
    queryFn: getLeadInfoById,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 0,
  })

  if (isLoading) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisible: true,
        severity: "error",
        message: error.info?.error || "Error while fetching Lead information.",
      })
    )
  }
  if (data) {
    dispatch(stopLoader())
    console.log("data for lead  by id----", data)
  }
  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid
          my={"2rem"}
          spacing={4}
          alignItems={"flex-start"}
          container
          size={10}
        >
          {data && <LeadInformation data={data} />}
          <Grid spacing={4} container size={4}>
            <Grid
              borderRadius={"1.2rem"}
              bgcolor={"secondary.main"}
              p={"1.3rem"}
              size={12}
            >
              {data && <CurrentFollowUP leadId={data._id} />}
            </Grid>
            <Grid
              borderRadius={"1.2rem"}
              bgcolor={"secondary.main"}
              p={"1.3rem"}
              size={12}
            >
              {data && (
                <SetFollowUp leadId={data._id} timeZone={data.timeZone} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default ViewLeadDetails
