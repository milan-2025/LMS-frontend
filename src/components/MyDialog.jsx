import { Grid, Modal, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ResponseDisplay from "./Responsedisplay"
import { useState } from "react"

const MyDialog = ({ setOpenAddResponse, open, title, responses, leadId }) => {
  const handleclose = () => {
    setOpenAddResponse(false)
  }
  const [selectedResponse, setSelectedResponse] = useState({
    leadId: null,
    response: null,
  })
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    maxHeight: "60vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "4px",
      //   marginLeft: "2rem",
      //   padding: "2rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: (theme) => theme.palette.grey[300],
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: (theme) => theme.palette.primary.main,
      borderRadius: "4px",
    },
  }
  return (
    <Modal open={open}>
      <Grid sx={style} container>
        <Grid container size={12}>
          <Typography flexGrow={1} variant="h6">
            {title}
          </Typography>
          <CloseIcon sx={{ cursor: "pointer" }} onClick={handleclose} />
        </Grid>
        {responses.map((response) => {
          return (
            <ResponseDisplay
              key={response.response}
              response={response.response}
              color={response.color}
              leadId={leadId}
              setSelectedResponse={setSelectedResponse}
              selectedResponse={selectedResponse}
              handleclose={handleclose}
            />
          )
        })}
      </Grid>
    </Modal>
  )
}

export default MyDialog
