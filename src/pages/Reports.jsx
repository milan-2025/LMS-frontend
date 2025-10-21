import { Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { getGeneralReport } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"
import ReportCard from "../components/ReportCard"

// const LIGHT_BLUE = "#e6f7ff" // The color for the lighter bars
// const DARK_BLUE = "#1890ff" // The color for the highlighted bar
// const getBarColor = (dataItem, index) => {
//   // Check if the current data point is 'Thu' or at the index of 'Thu'
//   if (dataItem.name === "Thu") {
//     return DARK_BLUE // Highlight color
//   }
//   return LIGHT_BLUE // Default color
// }

const Reports = () => {
  const dispatch = useDispatch()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["reports"],
    queryFn: getGeneralReport,
    staleTime: 5000,
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
        message: error.info?.message || "Error while getting report data.",
      })
    )
  }

  // const getIntroOfPage = (label) => {
  //   if (label === "Mon") {
  //     return "Page A is about men's clothing"
  //   }
  //   if (label === "Page B") {
  //     return "Page B is about women's dress"
  //   }
  //   if (label === "Page C") {
  //     return "Page C is about women's bag"
  //   }
  //   if (label === "Page D") {
  //     return "Page D is about household goods"
  //   }
  //   if (label === "Page E") {
  //     return "Page E is about food"
  //   }
  //   if (label === "Page F") {
  //     return "Page F is about baby food"
  //   }
  //   return ""
  // }

  if (data) {
    dispatch(stopLoader())
    console.log("report data---", data)
    // const transformedData = dataTransformer(data.callsDoneObj)
    // trd = dataTransformer(data.callsDoneObj)
  }
  return (
    <>
      <Grid container justifyContent={"center"} mb={"2.5rem"} size={12}>
        <Grid size={10} mt={"2.5rem"}>
          <Grid size={12}>
            <Typography fontWeight={600} variant="h5">
              Reports
            </Typography>
            <Typography variant="caption">
              Track your daily and monthly activity.
            </Typography>
          </Grid>

          {data && (
            <Grid container spacing={3} mt={"2rem"} size={12}>
              <ReportCard
                obj={data.callsDoneObj}
                today={data.today}
                title={"Calls Done"}
              />
              <ReportCard
                obj={data.emailsFoundObj}
                today={data.today}
                title={"Emails Found"}
              />
              <ReportCard
                obj={data.quotesReceivedObj}
                today={data.today}
                title={"Quotes Received"}
              />
              <ReportCard
                obj={data.loadsCoveredObj}
                today={data.today}
                title={"Loads Covered"}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default Reports
