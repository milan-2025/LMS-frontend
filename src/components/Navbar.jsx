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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "secondary.main",
        }}
        position="fixed"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Univasion CRM
          </Typography>

          {/* <NavLink> */}

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
  )
}
