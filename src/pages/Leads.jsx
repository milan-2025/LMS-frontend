import {
  Box,
  Button,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import UploadIcon from "@mui/icons-material/Upload"
import { useState } from "react"
import { styled, useTheme } from "@mui/material/styles"
import { useDispatch } from "react-redux"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getLeads, uploadLeads } from "../util/http"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/AlertSlice"
import ActionRow from "../components/ActionRow"
import CopyPhoneNumberModal from "../components/CopyPhoneNumberModal"
import LeadsTable from "../components/LeadsTable"

const validateExcelFile = (file) => {
  // Check file extension
  const fileName = file.name
  const extension = fileName.split(".").pop().toLowerCase()
  const validExtensions = ["xls", "xlsx"]
  if (!validExtensions.includes(extension)) {
    return false
  }

  // Check MIME type
  const mimeType = file.type
  const validMimeTypes = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ]
  if (!validMimeTypes.includes(mimeType)) {
    return false
  }

  // If both checks pass, it's likely a valid Excel file
  return true
}

const Leads = () => {
  const [uploadedFileFile, setUploadedFile] = useState(null)
  // const [fileName, setFileName] = useState("")

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  })
  const dispatch = useDispatch()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: uploadLeads,
    retry: 0,
    onSuccess: (data) => {
      dispatch(stopLoader())
      dispatch(
        showAlert({
          isVisile: true,
          severity: "success",
          message: "Leads uploadded successfully.",
        })
      )
    },
  })

  const handleFileChange = (files) => {
    const file = files[0]
    if (!validateExcelFile(file)) {
      dispatch(
        showAlert({
          isVisile: true,
          severity: "error",
          message: "Only excell file must be uploaded.",
        })
      )
    } else {
      // setFileName(file.name);
      const formData = new FormData()
      formData.append("file", file)
      mutate(formData)
      // files = null
    }
  }
  if (isPending) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisile: true,
        severity: "error",
        message: error.info?.error || "Error while uploading leads.",
      })
    )
  }

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(null)
  // const [limit, setLimit] = useState(10)
  // const [fetchedLeads, setFetchedLeads] = useState(null)
  const limit = 5
  const {
    data,
    isLoading,
    isError: isFetchLeadsError,
    error: fetchLeadsError,
  } = useQuery({
    queryKey: [
      "leads",
      {
        page: page,
      },
    ],
    queryFn: getLeads,
    staleTime: Infinity,
  })
  let content = <Typography variant="subtitle2">No Leads to show</Typography>
  if (isLoading) {
    dispatch(startLoader())
  }
  if (isFetchLeadsError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisile: true,
        severity: "error",
        message: fetchLeadsError.info?.error || "Error while getting leads.",
      })
    )
    content = (
      <Typography variant="subtitle2">
        {fetchLeadsError.info?.error || "Error while getting leads."}
      </Typography>
    )
  }
  let actions = [
    "Copy Phone Number",
    "Change Status",
    "Set Follow Up",
    "Copy Email",
    "Add Email",
    "Add Phone Number",
    "Add Response",
    "Add Comment",
    "View Details",
  ]
  let fetchedLeads = null
  if (data) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisile: true,
        severity: "success",
        message: "Leads fetched successfully.",
      })
    )
    console.log("leads", data)
    fetchedLeads = data.leads.map((lead) => {
      return {
        _id: lead._id,
        company: lead.shipper,
        state: lead.state,
        timeZone: lead.timeZone,
        status: lead.status,
        actions: actions,
      }
    })
    // console.log("fl", formatedLeads)
    // setFetchedLeads(formatedLeads)
  }
  const theme = useTheme()

  return (
    <>
      <Grid mt={"2rem"} container justifyContent={"center"}>
        <Grid size={10}>
          <Grid container justifyContent={"betweeen"} size={12}>
            <Typography flexGrow={1} variant="h5">
              Leads
            </Typography>

            <Button
              sx={{
                color: "#FFFFFF",
                borderRadius: "5rem",
              }}
              startIcon={<UploadIcon />}
              variant="contained"
              component="label"
            >
              Upload
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => handleFileChange(event.target.files)}
              />
            </Button>
          </Grid>
          <Grid size={12}>
            {fetchedLeads && (
              <LeadsTable leads={data.leads} fetchedLeads={fetchedLeads} />
            )}

            {data && (
              <Grid mb={"3rem"} justifyContent={"center"} container mt={"2rem"}>
                <Pagination
                  count={data.totalPages}
                  page={page}
                  onChange={(e, changedPage) => {
                    console.log("cp", changedPage)
                    setPage(changedPage)
                  }}
                  color="primary"
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Leads
