// import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useTheme } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../store/userSlice"
import { useEffect, useRef, useState } from "react"
import { Grid } from "@mui/material"
import TimeZonesCurrentTime from "./TimeZonesCurrentTime"
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const theme = useTheme()
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogoutButton = () => {
    dispatch(handleLogout())
    navigate("/")
  }
  useEffect(() => {
    if (!token) {
      navigate("/")
    }
  }, [token])
  let content
  if (!token) {
    content = (
      <>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "active-nav-link" : "nav-link"
          }}
          to={"/"}
        >
          <Button color="inherit" className="nav-link-hover">
            Login
          </Button>
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              color: isActive ? "#22c55e" : "#FFFFFF",
            }
          }}
          to={"/sign-up"}
        >
          <Button color="inherit" className="nav-link-hover">
            Sign Up
          </Button>
        </NavLink>
      </>
    )
  }
  if (token) {
    content = (
      <>
        <Button
          color="inherit"
          onClick={handleLogoutButton}
          className="nav-link-hover"
        >
          Logout
        </Button>
      </>
    )
  }
  const appBarRef = useRef(null) // Create a ref for the AppBar
  const [appBarHeight, setAppBarHeight] = useState(0)

  useEffect(() => {
    if (appBarRef.current) {
      // Access the DOM element's height
      setAppBarHeight(appBarRef.current.offsetHeight)
    }

    // Optional: Recalculate height on window resize
    const handleResize = () => {
      if (appBarRef.current) {
        setAppBarHeight(appBarRef.current.offsetHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: "secondary.main",
          }}
          position="fixed"
          ref={appBarRef}
        >
          <Toolbar>
            <Typography variant="h6" component="div">
              Univasion CRM
            </Typography>

            {/* <NavLink> */}
            <TimeZonesCurrentTime />
            {/* </NavLink> */}
            {content}
            {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu" 
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ height: appBarHeight }} />
    </>
  )
}
