import * as React from "react"
import { Button } from "@mui/material"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import CopyEmailsModal from "./CopyEmailsModal"
import { useMutation } from "@tanstack/react-query"
import { getBulkEmails } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"

function removeCaseInsensitiveDuplicates(array) {
  // Use a Set to store the lowercase version of strings we have already included
  // in the result array. This ensures O(1) average time complexity for lookups.
  console.log("inarray--", array)
  const seenLower = new Set()
  const uniqueArray = []

  for (const item of array) {
    if (typeof item !== "string") {
      // Optionally handle non-string elements, here we just skip them
      continue
    }

    // 1. Convert the current item to lowercase for comparison
    const lowerCaseItem = item.toLowerCase()

    // 2. Check if the lowercase version has already been seen
    if (!seenLower.has(lowerCaseItem)) {
      // 3. If not seen, add the lowercase version to the Set
      seenLower.add(lowerCaseItem)

      // 4. Add the original-cased item to the result array
      uniqueArray.push(item)
    }
    // If the item is already in seenLower, it's a case-insensitive duplicate, so we skip it.
  }

  return uniqueArray
}

const LeadBulckActionButton = ({
  state,
  setState,
  timeZone,
  setTimeZone,
  commodity,
  setCommodity,
  status,
  setStatus,
  tabValue,
}) => {
  const options = ["Copy All Emails"]
  const [open, setOpen] = React.useState(false)
  const [openEmailModal, setOpenEmailModal] = React.useState(false)
  const anchorRef = React.useRef(null)
  //   const [selectedIndex, setSelectedIndex] = React.useState(1)

  const [button, setButton] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  // const [remainingEmails, setRemainingEmails] = React.useState(2)
  const [totalButtons, setTotalButtons] = React.useState(null)

  const [copyButtonclicked, setCopyButtonClicked] = React.useState(false)
  const [buttonsClicked, setButtonsClicked] = React.useState([])
  const [Emails, setEmails] = React.useState([])

  const dispatch = useDispatch()
  let allEmails = []
  const { mutate, isPending, isError, error, data, reset } = useMutation({
    mutationFn: getBulkEmails,
    retry: 0,
    onSuccess: (data) => {
      try {
        console.log(data)
        setCopyButtonClicked(false)
        allEmails = data.emailData.map((emailLead) => {
          return [
            emailLead.email,
            ...emailLead.emails.map((email) => email.email),
          ]
        })
        // allEmails = allEmails.map(email)
        allEmails = allEmails.flat()
        allEmails = removeCaseInsensitiveDuplicates(allEmails)

        console.log(allEmails)
        setEmails(allEmails)

        setTotalButtons(data.totalButtons)
        const emailString = allEmails.join("; ")

        navigator.clipboard.writeText(emailString).then(() => {
          dispatch(stopLoader())
        })

        // data.emails = removeCaseInsensitiveDuplicates(
        //   data.emails.map((item) => {
        //     return item.email
        //   })
        // )
        // console.log(data.emails)
        // setTotalButtons(Math.ceil(data.totalEmails / limit))
        // setRemainingEmails(data.remainingEmails)
        // const emailString = data.emails.join("; ")
        // console.log("emailString----", emailString)
        // navigator.clipboard.writeText(emailString).then(() => {
        //   dispatch(stopLoader())
        // })
      } catch (e) {
        console.log(e)
      }
    },
  })

  const copyButtonClicked = (buttonNumber) => {
    setButton(buttonNumber)
    setCopyButtonClicked(true)
    setButtonsClicked((oldState) => {
      let newState = [...oldState]
      if (!oldState.includes(buttonNumber)) {
        newState.push(buttonNumber)
      }
      return newState
    })
    dispatch(
      showAlert({
        isVisisble: true,
        severity: "success",
        message: `${Emails.length} emails copied.`,
      })
    )
  }

  // if (isPending) {
  //   dispatch(startLoader())
  // }

  if (isError) {
    setCopyButtonClicked(false)
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisisble: true,
        message: error.info?.message || "Some error while fetching emails.",
        severity: "error",
      })
    )
    reset()
  }

  const handleMenuItemClick = (event, index) => {
    // setSelectedIndex(index)
    setOpen(false)
    mutate({
      state: state,
      commodity: commodity,
      timeZone: timeZone,
      status: status,
      button: button,
      limit: limit,
      // remainingEmails: button == 1 ? limit : remainingEmails,
      // overHeadButton: button - 1,
      tabValue,
    })
    // dispatch(stopLoader())
    setOpenEmailModal(true)
  }
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  React.useEffect(() => {
    if (copyButtonclicked) {
      mutate({
        state: state,
        commodity: commodity,
        timeZone: timeZone,
        status: status,
        button: button,
        limit: limit,
        // remainingEmails: button == 1 ? limit : remainingEmails,
        // overHeadButton: button - 1,
        tabValue,
      })
    }
  }, [button])

  return (
    <>
      <Button
        ref={anchorRef}
        onClick={handleToggle}
        color="primary"
        variant="contained"
      >
        Bulk Actions
      </Button>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {data && (
        <CopyEmailsModal
          openModal={openEmailModal}
          setOpenModal={setOpenEmailModal}
          buttonsClicked={buttonsClicked}
          setButton={setButton}
          totalEmails={Emails.length}
          totalLeads={data.totalLeads}
          totalButtons={totalButtons}
          setButtonsClicked={setButtonsClicked}
          copyButtonClicked={copyButtonClicked}
        />
      )}
    </>
  )
}

export default LeadBulckActionButton
