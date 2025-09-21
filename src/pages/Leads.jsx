import { Button, Grid, Pagination, Tabs, Typography } from "@mui/material"
import UploadIcon from "@mui/icons-material/Upload"
import { useState } from "react"
import { styled, useTheme } from "@mui/material/styles"
import { useDispatch } from "react-redux"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getLeads, queryClient, uploadLeads } from "../util/http"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"
import ActionRow from "../components/ActionRow"
import CopyPhoneNumberModal from "../components/CopyPhoneNumberModal"
import LeadsTable from "../components/LeadsTable"
import * as React from "react"
import Box from "@mui/material/Box"
import Tab from "@mui/material/Tab"

import { useNavigate } from "react-router-dom"
import LeadTabs from "../components/LeadTabs"
import Collapse from "@mui/material/Collapse"
import LeadFilters from "../components/LeadFilters"

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
  // const [uploadedFileFile, setUploadedFile] = useState(null)
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
      console.log("success")
      queryClient
        .invalidateQueries({
          queryKey: ["leads"],
        })
        .then(() => {
          dispatch(stopLoader())
          dispatch(
            showAlert({
              isVisile: true,
              severity: "success",
              message: "Leads uploadded successfully.",
            })
          )
        })
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

  const theme = useTheme()

  const [tabValue, setTabValue] = useState("New")

  // const [filtersApplied, setFiltersApplied] = useState(false)

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
          <Grid>
            <LeadTabs tabValue={tabValue} setTabValue={setTabValue} />
            <LeadFilters tabValue={tabValue} />
            <Grid size={12}>
              <LeadsTable tabValue={tabValue} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Leads
