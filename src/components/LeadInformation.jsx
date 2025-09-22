import { Button, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getLeadInfoById } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"

const LeadInformation = () => {
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
    <Grid size={8}>
      <Grid size={12}>
        <Typography variant="h5">Lead Details</Typography>
        <Typography color="text.main" variant="subtitle2">
          Review and manage lead information for{" "}
          <span
            style={{
              fontWeight: 500,
              color: "#FFFFFF",
            }}
          >
            {data.shipperName}
          </span>
        </Typography>
      </Grid>
      <Grid
        size={12}
        bgcolor={"secondary.main"}
        borderRadius={"1.2rem"}
        mt={"1.2rem"}
        padding={"1.2rem"}
        // sx={{
        //   boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
        // }}
        // height={400}
      >
        <Grid mb={"1.2rem"} size={12}>
          <Typography variant="body1">Lead Information</Typography>
        </Grid>

        <Grid mb={"1.2rem"} container size={12}>
          <Grid size={6}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              Shipper Name
            </Typography>
            <Typography variant="body2">Shipper Name</Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              State
            </Typography>
            <Typography variant="body2">State</Typography>
          </Grid>
        </Grid>
        <Grid mb={"1.2rem"} container size={12}>
          <Grid size={6}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              Time Zone
            </Typography>
            <Typography variant="body2">Shipper Name</Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              Commodity
            </Typography>
            <Typography variant="body2">State</Typography>
          </Grid>
        </Grid>
        <Grid mb={"1.2rem"} container size={12}>
          <Grid size={6}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              Phone Number
            </Typography>
            <Typography variant="body2">Shipper Name</Typography>
            <Typography
              ml={"0.1rem"}
              color="primary"
              size="small"
              variant="caption"
              sx={{
                cursor: "pointer",
              }}
            >
              View More
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              Email
            </Typography>
            <Typography variant="body2">State</Typography>
            <Typography
              ml={"0.1rem"}
              color="primary"
              size="small"
              variant="caption"
              sx={{
                cursor: "pointer",
              }}
            >
              View More
            </Typography>
          </Grid>
        </Grid>
        <Grid mb={"1.2rem"} container size={12}>
          <Grid size={6}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              Contact Person Name
            </Typography>
            <Typography variant="body2">Name</Typography>
            <Typography
              ml={"0.1rem"}
              color="primary"
              size="small"
              variant="caption"
              sx={{
                cursor: "pointer",
              }}
            >
              Add Name
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              Status
            </Typography>
            <Typography variant="body2">State</Typography>
            {/* <Typography
              ml={"0.1rem"}
              color="primary"
              size="small"
              variant="caption"
              sx={{
                cursor: "pointer",
              }}
            >
              View More
            </Typography> */}
          </Grid>
        </Grid>

        <Grid mb={"1.2rem"} container size={12}>
          <Grid size={12}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              Address
            </Typography>
            <Typography variant="body2">Address</Typography>
          </Grid>
        </Grid>
        <Grid container size={12}>
          <Grid size={12}>
            <Typography
              mb={"0.3rem"}
              fontSize={"0.85rem"}
              color="text.main"
              variant="body2"
            >
              Website
            </Typography>
            <Typography variant="body2">Website</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LeadInformation
