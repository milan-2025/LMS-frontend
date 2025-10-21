import {
  Button,
  FormHelperText,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { useMutation } from "@tanstack/react-query"
import { addComment, queryClient } from "../util/http"
import { useFormValues } from "../hooks/useFormValues"
import { isNotEmpty } from "../util/validation"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"
import { addLeadAction } from "../store/leadActionSlice"

const AddCommentModal = ({ leadId, openCommentModal, setOpenCommentModal }) => {
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

  const dispatch = useDispatch()

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

  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: addComment,
    retry: false,
    onSuccess: (data) => {
      dispatch(
        addLeadAction({
          leadId: leadId,
          name: "Add Comment",
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
          setCommentEdit(false)
          setComment("")
          setOpenCommentModal(false)
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
        message: error.info?.error || "Error while adding comment.",
      })
    )

    console.log("err", error)
    reset()
  }
  const handleAddComment = () => {
    if (commentDidEdit && !commentError.chk) {
      commentBlur()
      return
    }
    mutate({
      leadId,
      comment,
    })
  }

  return (
    <Modal
      open={openCommentModal}
      //   onClose={handleClose}
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
            Add Comment
          </Typography>
          <CloseIcon
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenCommentModal(false)
            }}
          />
        </Grid>

        <Grid ml={"auto"} mr={"auto"} mt={"1rem"} size={10}>
          <TextField
            id="email"
            onChange={commentChange}
            onBlur={commentBlur}
            value={comment}
            label="Comment"
            name="Comment"
            multiline={true}
            variant="outlined"
            error={commentDidEdit && !commentError.chk}
            fullWidth
            rows={4}
          />
          {commentDidEdit && !commentError.chk && (
            <FormHelperText sx={{ color: "error.main" }}>
              {commentError.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid mt={"1rem"} ml={"auto"} mr={"auto"} size={10}>
          <Button
            fullWidth
            sx={{
              color: "#F6F6F6",
            }}
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              handleAddComment()
            }}
          >
            Add Comment
          </Button>
        </Grid>
      </Grid>
    </Modal>
  )
}

export default AddCommentModal
