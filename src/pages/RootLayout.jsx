import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

import AlertDialog from "../components/AlertDialog"
import Common from "../components/Common"
// import { Token } from "@mui/icons-material"

const RootLayout = () => {
  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <Navbar />
      {/* <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
        // onClick={handleClose}
      >
        <CircularProgress color="primary" />
      </Backdrop> */}
      <AlertDialog />
      <Common />
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alertData.isVisible}
        autoHideDuration={6000}
        onClose={handleClose}
        key={alertData.message}
      >
        <Alert
          onClose={handleClose}
          severity={alertData.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertData.message}
        </Alert>
      </Snackbar> */}
      <Outlet />
    </>
  )
}

export default RootLayout
