import {
  Button,
  FormHelperText,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useFormValues } from "../hooks/useFormValues"
import { isNotEmpty } from "../util/validation"
import { useMutation } from "@tanstack/react-query"
import { addPhoneNumber, queryClient } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/AlertSlice"

const AddPhoneNumberModal = ({
  //   phoneNumber,
  openModal,
  setOpenModal,
  leadId,
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
  }

  const {
    enteredValue: phnNumber,
    setEnteredValue: setPhnNumber,
    handleOnValueBlur: phnNumberBlur,
    handleOnValueChange: phnNumberChange,
    hasError: phnNumberError,
    didEdit: phnNumberDidEdit,
    setDidEdit: setPhnEdit,
  } = useFormValues("", (value) => {
    return isNotEmpty(value)
  })

  const {
    enteredValue: comment,
    setEnteredValue: setComment,
    handleOnValueBlur: commentBlur,
    handleOnValueChange: commentChange,
    hasError: commentError,
    didEdit: commentDidEdit,
    setDidEdit: setCommentEdit,
  } = useFormValues("", (value) => {
    return isNotEmpty(value)
  })

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: addPhoneNumber,
    retry: 0,
    onSuccess: (data) => {
      //
      dispatch(stopLoader())
      queryClient.invalidateQueries({
        queryKey: ["phoneNumbers", { leadId: leadId }],
        exact: true,
      })
      dispatch(
        showAlert({
          isVisible: true,
          severity: "success",
          message: "Phone number added successfully.",
        })
      )
    },
  })
  const dispatch = useDispatch()
  if (isPending) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisible: true,
        severity: "error",
        message: error.info?.error || "Error while adding phone number.",
      })
    )
  }
  const addNumber = () => {
    if (
      phnNumberDidEdit &&
      commentDidEdit &&
      phnNumberError.chk &&
      commentError.chk
    ) {
      // mutate
      mutate({
        phoneNumber: phnNumber,
        comment: comment,
        leadId: leadId,
      })
      setPhnNumber("")
      setComment("")
      setCommentEdit(false)
      setPhnEdit(false)

      setOpenModal(false)
    } else {
      phnNumberBlur()
      commentBlur()
    }
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
        // maxHeight={"70vh"}
        sx={style}

        // justifyContent={"center"}
      >
        <Grid container size={12}>
          <Typography flexGrow={1} variant="h6">
            Add Phone Number
          </Typography>
          <CloseIcon
            onClick={() => {
              setOpenModal(false)
            }}
          />
        </Grid>
        <Grid mt={"1rem"} container justifyContent={"center"} size={12}>
          {/* <PhoneNumberDisplay phoneNumber={phoneNumber} comment={"Default"} /> */}
          <Grid size={10}>
            <TextField
              id="email"
              onChange={phnNumberChange}
              onBlur={phnNumberBlur}
              value={phnNumber}
              label="Phone Number"
              name="Phone Number"
              variant="outlined"
              error={phnNumberDidEdit && !phnNumberError.chk}
              fullWidth
            />
            {phnNumberDidEdit && !phnNumberError.chk && (
              <FormHelperText sx={{ color: "error.main" }}>
                {phnNumberError.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid mt={"1rem"} size={10}>
            <TextField
              id="email"
              onChange={commentChange}
              onBlur={commentBlur}
              value={comment}
              label="Comment"
              name="Comment"
              placeholder="eg. Work, Home, ext:117"
              variant="outlined"
              error={commentDidEdit && !commentError.chk}
              fullWidth
            />
            {commentDidEdit && !commentError.chk && (
              <FormHelperText sx={{ color: "error.main" }}>
                {commentError.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid mt={"1rem"} size={10}>
            <Button
              fullWidth
              sx={{
                color: "#F6F6F6",
              }}
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                addNumber()
              }}
            >
              Add Phone Number
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AddPhoneNumberModal
