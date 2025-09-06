import { Button, TableCell } from "@mui/material"
import PhoneIcon from "@mui/icons-material/Phone"
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import EmailIcon from "@mui/icons-material/Email"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import FeedbackIcon from "@mui/icons-material/Feedback"
import CommentIcon from "@mui/icons-material/Comment"
import InfoIcon from "@mui/icons-material/Info"
import CopyPhoneNumberModal from "./CopyPhoneNumberModal"
import { useState } from "react"
import AddPhoneNumberModal from "./AddPhoneNumberModal"
import SetFollowUpModal from "./SetFollowUpModal"
const ActionRow = ({ lead, actions }) => {
  const [openPhoneNumber, setOpenPhoneNumber] = useState(false)
  const [openAddPhoneNumber, setOpenAddPhoneNumber] = useState(false)
  const [openfollowUp, setOpenFollowUp] = useState(false)

  const handleOnCopyPhnNumberClicked = () => {
    setOpenPhoneNumber(true)
  }
  const handleOnAddPhnNumberClicked = () => {
    setOpenAddPhoneNumber(true)
  }
  const handleOpenFollowUp = () => {
    setOpenFollowUp(true)
  }
  console.log("action_row_lead", lead)
  return (
    <>
      <Button
        variant="contained"
        // size="small"
        startIcon={<PhoneIcon />}
        color="primary"
        sx={{
          mx: 2,
        }}
        onClick={handleOnCopyPhnNumberClicked}
      >
        {actions[0]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<AddCircleIcon />}
        variant="contained"
        size="medium"
        color="primary"
      >
        {actions[4]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<ChangeCircleIcon />}
        variant="contained"
        size="medium"
        color="primary"
      >
        {actions[1]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<BookmarkIcon />}
        variant="contained"
        size="medium"
        color="primary"
        onClick={handleOpenFollowUp}
      >
        {actions[2]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<EmailIcon />}
        variant="contained"
        size="medium"
        color="primary"
      >
        {actions[3]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<AddCircleIcon />}
        variant="contained"
        size="medium"
        color="primary"
        onClick={handleOnAddPhnNumberClicked}
      >
        {actions[5]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<FeedbackIcon />}
        variant="contained"
        size="medium"
        color="primary"
      >
        {actions[6]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<CommentIcon />}
        variant="contained"
        size="medium"
        color="primary"
      >
        {actions[7]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<InfoIcon />}
        variant="contained"
        size="medium"
        color="primary"
      >
        {actions[8]}
      </Button>
      <CopyPhoneNumberModal
        openModal={openPhoneNumber}
        setOpenModal={setOpenPhoneNumber}
        phoneNumber={lead.phoneNumber}
        leadId={lead._id}
      />
      <AddPhoneNumberModal
        openModal={openAddPhoneNumber}
        setOpenModal={setOpenAddPhoneNumber}
        leadId={lead._id}
      />
      <SetFollowUpModal
        openModal={openfollowUp}
        setOpenModal={setOpenFollowUp}
        leadId={lead._id}
        timeZone={lead.timeZone}
      />
    </>
  )
}

export default ActionRow
