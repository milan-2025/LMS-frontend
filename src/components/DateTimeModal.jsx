import { Grid, Modal } from "@mui/material"

const DateTimeModal = ({ openDateTime, setOpenDateTime, children }) => {
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
  }
  return (
    <Modal
      open={openDateTime}
      // onClose={handleClose}
      aria-labelledby="modal-modal-copy-phone-number"
      aria-describedby="modal-modal-description"
    >
      <Grid
        container
        // size={{
        //   xs: 10,
        //   md: 6,
        // }}
        // maxHeight={"70vh"}
        sx={style}

        // justifyContent={"center"}
      >
        {children}
      </Grid>
    </Modal>
  )
}

export default DateTimeModal
