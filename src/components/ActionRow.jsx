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
import { useEffect, useState } from "react"
import AddPhoneNumberModal from "./AddPhoneNumberModal"
import SetFollowUpModal from "./SetFollowUpModal"
import { useSelector } from "react-redux"
import MyDialog from "./MyDialog"
import ResponseDisplay from "./Responsedisplay"
import AddCommentModal from "./AddCommentModal"
const ActionRow = ({ lead, actions }) => {
  const [openPhoneNumber, setOpenPhoneNumber] = useState(false)
  const [openAddPhoneNumber, setOpenAddPhoneNumber] = useState(false)
  const [openEmailModal, setOpenEmailModal] = useState(false)
  const [openAddEmailModal, setOpenAddEmail] = useState(false)
  const [openfollowUp, setOpenFollowUp] = useState(false)
  const [openAddResponse, setOpenAddResponse] = useState(false)
  const [openAddCommentModal, setOpenAddCommentModal] = useState(false)

  const handleOnCopyPhnNumberClicked = () => {
    setOpenPhoneNumber(true)
  }
  const handleOnAddPhnNumberClicked = () => {
    setOpenAddPhoneNumber(true)
  }

  const handleOnCopyEmailClicked = () => {
    setOpenEmailModal(true)
  }
  const handleOnAddEmailClicked = () => {
    setOpenAddEmail(true)
  }
  const handleOpenFollowUp = () => {
    setOpenFollowUp(true)
  }
  const handleAddResponse = () => {
    setOpenAddResponse(true)
  }

  const handleAddCommentModal = () => {
    setOpenAddCommentModal(true)
  }
  console.log("action_row_lead", lead)

  const leadActions = useSelector((state) => state.leadAction)

  // if (localStorage.getItem("token")) {
  //   localStorage.setItem("leadActions", JSON.stringify(leadActions))
  // }

  console.log("la", leadActions)

  const leadChecker = (actionName) => {
    let leadFound = leadActions.find((item) => {
      if (item.leadId == lead._id && item.name == actionName) {
        return true
      }
    })
    if (!leadFound) {
      return false
    }
    return leadFound.isCompleted
  }

  const responses = [
    {
      response: "Not Connected",
      color: "error",
      status: "Not Connected",
    },
    {
      response: "Freight On Board (FOB)",
      color: "error",
      status: "DND",
    },
    {
      response: "Customer Routed",
      color: "error",
      status: "DND",
    },
    {
      response: "Do Not Desturb (DND)",
      color: "error",
      status: "DND",
    },
    {
      response: "Not Interested",
      color: "error",
      status: "DND",
    },
    {
      response: "Callback Later",
      color: "warning",
      status: "Callback Later",
    },
    {
      response: "Email Sent",
      color: "warning",
      status: "Emailed",
    },
    {
      response: "Quote Received",
      color: "success",
      status: "Prospect",
    },
    {
      response: "Load Received",
      color: "success",
      status: "Prospect",
    },
    {
      response: "Load covered",
      color: "success",
      status: "Customer Added",
    },
  ]

  return (
    <>
      <Button
        variant="contained"
        // size="small"
        startIcon={<PhoneIcon />}
        color={leadChecker(actions[0]) ? "info" : "secondary"}
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
        color={leadChecker(actions[4]) ? "info" : "secondary"}
        onClick={handleOnAddEmailClicked}
      >
        {actions[4]}
      </Button>
      {/* <Button
        sx={{
          mx: 2,
        }}
        startIcon={<ChangeCircleIcon />}
        variant="contained"
        size="medium"
        color="primary"
      >
        {actions[1]}
      </Button> */}
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<BookmarkIcon />}
        variant="contained"
        size="medium"
        color={leadChecker(actions[2]) ? "info" : "secondary"}
        onClick={handleOpenFollowUp}
      >
        {actions[2]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<FeedbackIcon />}
        variant="contained"
        size="medium"
        color={leadChecker(actions[6]) ? "info" : "secondary"}
        onClick={handleAddResponse}
      >
        {actions[6]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<EmailIcon />}
        variant="contained"
        size="medium"
        color={leadChecker(actions[3]) ? "info" : "secondary"}
        onClick={handleOnCopyEmailClicked}
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
        color={leadChecker(actions[5]) ? "info" : "secondary"}
        onClick={handleOnAddPhnNumberClicked}
      >
        {actions[5]}
      </Button>
      <Button
        sx={{
          mx: 2,
        }}
        startIcon={<CommentIcon />}
        variant="contained"
        size="medium"
        color={leadChecker(actions[7]) ? "info" : "secondary"}
        onClick={handleAddCommentModal}
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
        color="secondary"
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
      <CopyPhoneNumberModal
        openModal={openEmailModal}
        setOpenModal={setOpenEmailModal}
        phoneNumber={lead.email}
        leadId={lead._id}
        isEmail={true}
      />
      <AddPhoneNumberModal
        openModal={openAddEmailModal}
        setOpenModal={setOpenAddEmail}
        leadId={lead._id}
        isEmail={true}
      />
      <SetFollowUpModal
        openModal={openfollowUp}
        setOpenModal={setOpenFollowUp}
        leadId={lead._id}
        timeZone={lead.timeZone}
      />
      <MyDialog
        open={openAddResponse}
        setOpenAddResponse={setOpenAddResponse}
        title={"Select Response"}
        responses={responses}
        leadId={lead._id}
      />

      <AddCommentModal
        openCommentModal={openAddCommentModal}
        setOpenCommentModal={setOpenAddCommentModal}
        leadId={lead._id}
      />

      {/* </MyDialog> */}
    </>
  )
}

export default ActionRow
