// import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { Link, NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useTheme } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../store/userSlice"
import { useEffect, useRef, useState } from "react"
import { Drawer, Grid, IconButton, ListItemIcon } from "@mui/material"
import TimeZonesCurrentTime from "./TimeZonesCurrentTime"
// import IconButton from '@mui/material/IconButton';
import MenuIcon from "@mui/icons-material/Menu"
import List from "@mui/material/List"
// import Divider from '@mui/material/Divider';
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from "@mui/material/ListItemText"
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd"
import AssessmentIcon from "@mui/icons-material/Assessment"
import DashboardIcon from "@mui/icons-material/Dashboard"

export default function Navbar() {
  const theme = useTheme()
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogoutButton = () => {
    dispatch(handleLogout())
    navigate("/")
  }
  const [openDrawer, setOpenDrawer] = useState(false)
  const toggleDrawer = (newState) => {
    setOpenDrawer(newState)
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

  const links = [
    {
      text: "Leads",
      link: "/leads",
      icon: <AssignmentIndIcon />,
    },
    {
      text: "Reports",
      link: "/reports",
      icon: <AssessmentIcon />,
    },
    {
      text: "Admin Dashboard",
      link: "/admin-dashoard",
      icon: <DashboardIcon />,
    },
  ]
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
              LMS
            </Typography>

            {/* <NavLink> */}
            <TimeZonesCurrentTime />
            {/* </NavLink> */}
            {content}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 2 }}
              onClick={() => {
                toggleDrawer(true)
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ height: appBarHeight }} />
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => {
          toggleDrawer(false)
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => {
            toggleDrawer(false)
          }}
        >
          <List>
            {links.map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <Link
                  to={item.link}
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
