import { Button, Grid, Typography, useTheme } from "@mui/material"
import LeadInformation from "../components/LeadInformation"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getComments, getLeadInfoById, getResponses } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"

import SetFollowUp from "../components/SetFollowUP"
import CurrentFollowUP from "../components/CurrentFollowUp"
import HistoryContainer from "../components/HistoryContainer"

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
  const theme = useTheme()
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
          {data && (
            <Grid size={8}>
              <LeadInformation data={data} />
              <Grid
                mt={"1.8rem"}
                bgcolor={"secondary.main"}
                // height={300}
                size={12}
                borderRadius={"1.2rem"}
                p={3}
              >
                <HistoryContainer
                  // leadId={data._id}
                  historyTitle={"Response History"}
                  queryKey={[
                    "leads",
                    "responses",
                    {
                      leadId: data._id,
                    },
                  ]}
                  queryFn={getResponses}
                />
              </Grid>
              <Grid
                mt={"1.8rem"}
                bgcolor={"secondary.main"}
                // height={300}
                size={12}
                borderRadius={"1.2rem"}
                p={3}
              >
                <HistoryContainer
                  // leadId={data._id}
                  historyTitle={"Comment History"}
                  queryKey={[
                    "leads",
                    "comments",
                    {
                      leadId: data._id,
                    },
                  ]}
                  queryFn={getComments}
                />
              </Grid>
            </Grid>
          )}
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
