import { Grid, Icon, Modal, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import PhoneNumberDisplay from "./PhoneNumberDisplay"
import { useQuery } from "@tanstack/react-query"
import { getPhoneNumbers } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"

const CopyPhoneNumberModal = ({
  phoneNumber,
  openModal,
  setOpenModal,
  leadId,
  isEmail = false,
}) => {
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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["phoneNumbers", { leadId: leadId, isEmail: isEmail }],
    queryFn: getPhoneNumbers,
    staleTime: Infinity,
  })
  const dispatch = useDispatch()
  if (isLoading) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisible: true,
        severity: "error",
        message: error.info?.error || "Error while getting phone numbers.",
      })
    )
  }
  if (data) {
    dispatch(stopLoader())
    console.log("fetched number", data)
  }

  return (
    <Modal
      open={openModal}
      //   onClose={handleClose}
      aria-labelledby="modal-modal-copy-phone-number"
      aria-describedby="modal-modal-description"
    >
      <Grid
        container
        // size={{
        //   xs: 10,
        //   md: 6,
        // }}
        sx={style}

        // justifyContent={"center"}
      >
        <Grid container size={12}>
          <Typography flexGrow={1} variant="h6">
            {!isEmail ? "Phone Numbers" : "Emails"}
          </Typography>
          <CloseIcon
            onClick={() => {
              setOpenModal(false)
            }}
          />
        </Grid>
        <Grid mt={"1rem"} size={12}>
          {phoneNumber.length > 0 && (
            <PhoneNumberDisplay
              leadId={leadId}
              phoneNumber={phoneNumber}
              comment={"Default"}
              isEmail={isEmail}
            />
          )}
          {data &&
            data.phoneNumbers.map((number) => {
              return (
                <PhoneNumberDisplay
                  phoneNumber={!isEmail ? number.phoneNumber : number.email}
                  comment={number.comment}
                  key={number._id}
                  leadId={leadId}
                  isEmail={isEmail}
                />
              )
            })}
        </Grid>
      </Grid>
    </Modal>
  )
}

export default CopyPhoneNumberModal
