import { Grid, Typography, useTheme } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { addResponse, queryClient } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/AlertSlice"
import { addLeadAction } from "../store/leadActionSlice"

const ResponseDisplay = ({
  response,
  color,
  setSelectedResponse,
  leadId,
  selectedResponse,
  handleclose,
}) => {
  const theme = useTheme()
  const hoverStyles = {
    error: "rgba(211, 47, 47, 0.25)",
    success: "rgba(46, 125, 50, 0.25)",

    warning: "rgba(237, 108, 2, 0.5)",
  }

  const bgColors = {
    error: "rgba(211, 47, 47, 1)",
    success: "rgba(46, 125, 50, 1)",

    warning: "rgba(237, 108, 2, 1)",
  }

  const selectedChecker = () => {
    if (
      selectedResponse.response == response &&
      selectedResponse.leadId == leadId
    ) {
      return true
    }
    return false
  }
  const dispatch = useDispatch()

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: addResponse,
    retry: false,
    onSuccess: (data) => {
      setSelectedResponse({
        leadId: leadId,
        response: response,
      })
      dispatch(
        addLeadAction({
          leadId: leadId,
          name: "Add Response",
          isCompleted: true,
        })
      )
      queryClient
        .invalidateQueries({
          queryKey: ["leads"],
        })
        .then(() => {
          dispatch(stopLoader())
          dispatch(
            showAlert({
              isVisible: true,
              severity: "success",
              message: data.message,
            })
          )
          handleclose()
        })
    },
  })

  if (isPending) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisible: true,
        severity: "error",
        message: error.info?.error || "Error while adding response.",
      })
    )
    console.log("err", error)
  }

  const addResponseHandler = () => {
    mutate({
      leadId,
      response,
    })
  }

  return (
    <Grid
      p={"0.7rem"}
      m={"0.7rem"}
      borderRadius={"15px"}
      bgcolor={!selectedChecker() ? "secondary.main" : bgColors[color]}
      sx={{
        // color: theme.palette.warning,
        cursor: "pointer",
        ":hover": {
          transform: "scale(1.03)",
          boxShadow: `0px 4px 20px ${hoverStyles[color]}`,
        },
      }}
      onClick={(e) => {
        addResponseHandler()
      }}
      //   maxHeight={"60vh"}
      size={12}
      //   value={response}
    >
      <Typography
        color={!selectedChecker() ? color : "secondary.main"}
        variant="body1"
      >
        {response}
      </Typography>
    </Grid>
  )
}

export default ResponseDisplay
