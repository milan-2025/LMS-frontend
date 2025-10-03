import * as React from "react"
import { Button } from "@mui/material"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import CopyEmailsModal from "./CopyEmailsModal"

const LeadBulckActionButton = () => {
  const options = ["Copy All Emails"]
  const [open, setOpen] = React.useState(false)
  const [openEmailModal, setOpenEmailModal] = React.useState(false)
  const anchorRef = React.useRef(null)
  //   const [selectedIndex, setSelectedIndex] = React.useState(1)

  const handleMenuItemClick = (event, index) => {
    // setSelectedIndex(index)
    setOpenEmailModal(true)
    setOpen(false)
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
      <CopyEmailsModal
        openModal={openEmailModal}
        setOpenModal={setOpenEmailModal}
      />
    </>
  )
}

export default LeadBulckActionButton
