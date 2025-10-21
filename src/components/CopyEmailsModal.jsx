import { Button, Grid, Modal, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

const CopyEmailsModal = ({
  openModal,
  setOpenModal,
  totalEmails,
  buttonsClicked,
  setButtonsClicked,
  totalButtons,
  copyButtonClicked,
  totalLeads,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
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
  const intToArray = (num) => {
    let arr = []
    for (let i = 1; i <= num; i++) {
      arr.push(i)
    }
    return arr
  }
  const buttonNumberToSet = (buttonNumber) => {
    if (buttonNumber == 1) {
      if (totalLeads < 10) {
        return `first ${totalLeads} leads.`
      } else {
        return "first 10 leads."
      }
    } else if (buttonNumber == totalButtons) {
      if (totalLeads % 10 == 0) {
        return "last 10 leads."
      } else {
        return `last ${totalLeads % 10} leads.`
      }
    } else {
      return " next 10 leads"
    }
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
              setButtonsClicked([])
              setOpenModal(false)
            }}
            sx={{
              cursor: "pointer",
            }}
          />
        </Grid>
        <Grid mb={"0.8rem"} container justifyContent={"center"} size={12}>
          <Grid textAlign={"center"} size={12}>
            <Typography variant="h6">
              there are total {totalLeads} leads having emails.
            </Typography>
          </Grid>
        </Grid>
        {intToArray(totalButtons).map((item) => {
          return (
            <Grid
              mb={"0.8rem"}
              key={item}
              justifyContent={"center"}
              container
              size={12}
            >
              <Button
                onClick={() => {
                  copyButtonClicked(item)
                }}
                color={buttonsClicked.includes(item) ? "primary" : "secondary"}
                variant="contained"
              >
                Copy Emails of {buttonNumberToSet(item)}
              </Button>
            </Grid>
          )
        })}
        {/* <Grid mb={"0.8rem"} justifyContent={"center"} container size={12}>
          <Button color="secondary" variant="contained">
            Copy Emails (501 to 766)
          </Button>
        </Grid> */}
      </Grid>
    </Modal>
  )
}

export default CopyEmailsModal
