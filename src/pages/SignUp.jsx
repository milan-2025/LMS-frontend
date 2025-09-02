import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useState } from "react"
import { Link } from "react-router-dom"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event) => {
    event.preventDefault()
  }
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show)

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault()
  }

  const handleMouseUpConfirmPassword = (event) => {
    event.preventDefault()
  }
  return (
    <Grid
      container
      //   height={"100vh"}
      size={12}
      //   alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid
        container
        mt={"7rem"}
        size={{
          md: 4,
          xs: 10,
        }}
        p={"2rem"}
        // minHeight={400}
        bgcolor={"secondary.light"}
        // marginTop={"auto"}
        // marginBottom={"auto"}
        borderRadius={"1rem"}
        boxShadow={7}
      >
        <Typography variant={"h5"}>Create Your Account</Typography>
        {/* <Typography variant="caption" mt={"0.5rem"}>
          Enter your account details to access the app.
        </Typography> */}
        <Grid size={12} mt={"1.8rem"}>
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid size={12} mt={"1.5rem"}>
          <TextField id="email" label="Email" variant="outlined" fullWidth />
        </Grid>
        <Grid size={12} mt={"1.5rem"}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Grid size={12} mt={"1.5rem"}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-Confirmpassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-Confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showConfirmPassword
                          ? "hide the Confirmpassword"
                          : "display the Confirmpassword"
                      }
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      onMouseUp={handleMouseUpConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
            </FormControl>
          </Grid>
          <Grid size={12} mt={"1.8rem"} mb={"0.7rem"}>
            <Button fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Grid>
          <Typography variant="caption">
            Already have an account ?{" "}
            <Link
              style={{
                color: "#22C55E",
                fontWeight: 500,
                textDecoration: "none",
              }}
              to={"/"}
            >
              Login
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SignUp
