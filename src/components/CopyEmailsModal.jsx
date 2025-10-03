import { Button, Grid, Modal, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const CopyEmailsModal = ({ openModal, setOpenModal }) => {
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
    <Modal
      open={openModal}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-copy-phone-number"
      aria-describedby="modal-modal-description"
    >
      <Grid container sx={style}>
        <Grid mb={"0.3rem"} container size={12}>
          <Typography flexGrow={1} variant="h6"></Typography>
          <CloseIcon
            onClick={() => {
              setOpenModal(false)
            }}
            sx={{
              cursor: "pointer",
            }}
          />
        </Grid>
        <Grid mb={"0.8rem"} container justifyContent={"center"} size={12}>
          <Grid textAlign={"center"} size={12}>
            <Typography variant="h6">Total Emails: 766</Typography>
          </Grid>
        </Grid>
        <Grid mb={"0.8rem"} justifyContent={"center"} container size={12}>
          <Button color="secondary" variant="contained">
            Copy Emails (0 to 500)
          </Button>
        </Grid>
        <Grid mb={"0.8rem"} justifyContent={"center"} container size={12}>
          <Button color="secondary" variant="contained">
            Copy Emails (501 to 766)
          </Button>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default CopyEmailsModal
