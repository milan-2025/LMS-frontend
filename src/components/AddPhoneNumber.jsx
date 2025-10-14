import {
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { useFormValues } from "../hooks/useFormValues"
import { isNotEmpty } from "../util/validation"
import { useMutation } from "@tanstack/react-query"
import { addPhoneNumber, queryClient } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"
import { addLeadAction } from "../store/leadActionSlice"

const AddPhoneNumber = ({ leadId, isEmail = false }) => {
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

  const { mutate, isError, error, isPending, reset } = useMutation({
    mutationFn: addPhoneNumber,
    retry: false,
    onSuccess: (data) => {
      //
      queryClient
        .invalidateQueries({
          queryKey: ["leads"],
        })
        .then(() => {
          queryClient
            .invalidateQueries({
              queryKey: ["phoneNumbers"],
            })
            .then(() => {
              dispatch(stopLoader())

              dispatch(
                addLeadAction({
                  leadId: leadId,
                  name: !isEmail ? "Add Phone Number" : "Add Email",
                  isCompleted: true,
                })
              )
              dispatch(
                showAlert({
                  isVisible: true,
                  severity: "success",
                  message: data.message,
                })
              )
            })
        })
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
    // isError = false
    reset()
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
        isEmail,
      })

      setPhnNumber("")
      setComment("")
      setCommentEdit(false)
      setPhnEdit(false)

      //   setOpenModal(false)
    } else {
      phnNumberBlur()
      commentBlur()
    }
  }

  return (
    <>
      <Grid container size={12}>
        <Typography flexGrow={1} variant="h6">
          {!isEmail ? "Add Phone Number" : "Add Email"}
        </Typography>
      </Grid>
      <Grid mt={"1rem"} container justifyContent={"center"} size={12}>
        {/* <PhoneNumberDisplay phoneNumber={phoneNumber} comment={"Default"} /> */}
        <Grid size={10}>
          <TextField
            id="email"
            onChange={phnNumberChange}
            onBlur={phnNumberBlur}
            value={phnNumber}
            label={!isEmail ? "Phone Number" : "Email"}
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
            {!isEmail ? "Add Phone Number" : "Add Email"}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default AddPhoneNumber
