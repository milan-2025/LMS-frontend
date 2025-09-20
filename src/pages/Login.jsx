import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormValues } from "../hooks/useFormValues"
import { isNotEmpty, isValidEmail } from "../util/validation"
import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../util/http"
import { useDispatch } from "react-redux"
import { handleLogin } from "../store/userSlice"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/alertSlice"
// import { Email, Password } from "@mui/icons-material"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event) => {
    event.preventDefault()
  }

  const theme = useTheme()
  const navigate = useNavigate()

  const {
    enteredValue: email,
    setEnteredValue: setEmail,
    handleOnValueBlur: emailBlur,
    handleOnValueChange: emailChange,
    hasError: emailError,
    didEdit: didEmailEdit,
  } = useFormValues("", (value) => {
    return isNotEmpty(value).chk ? isValidEmail(value) : isNotEmpty(value)
  })

  const {
    enteredValue: password,
    setEnteredValue: setPassword,
    handleOnValueBlur: passwordBlur,
    handleOnValueChange: passwordChange,
    hasError: passwordError,
    didEdit: didPasswordEdit,
  } = useFormValues("", (value) => {
    return isNotEmpty(value)
  })

  const [canLogin, setCanLogin] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      didEmailEdit &&
      didPasswordEdit &&
      emailError.chk &&
      passwordError.chk
    ) {
      setCanLogin(true)
    } else {
      setCanLogin(false)
    }
  }, [email, password])

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // Find the native input elements
  //     const emailInput = document.querySelector('input[name="email"]')
  //     const passwordInput = document.querySelector('input[name="password"]')

  //     // Update state if values are found

  //     setEmail(emailInput?.value || ""), setPassword(passwordInput?.value || "")
  //   }, 100)

  //   return () => clearTimeout(timer) // Clean up the timer
  // }, [])

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: loginUser,
    retry: false,
    onSuccess: (data) => {
      console.log("user logged in successfully")
      // console.log("data", data)
      dispatch(stopLoader())
      const token = data.token
      const expirationTime = Date.now() + 9 * 60 * 60 * 1000
      dispatch(
        handleLogin({
          token: token,
          expirationTime: expirationTime,
        })
      )

      navigate("/leads")
    },
  })

  const handleLoginButton = () => {
    if (
      didEmailEdit &&
      didPasswordEdit &&
      emailError.chk &&
      passwordError.chk
    ) {
      mutate({
        email: email,
        password: password,
      })
    } else {
      emailBlur()
      passwordBlur()
    }
  }

  if (isPending) {
    dispatch(startLoader())
  }

  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisible: true,
        severity: "error",
        message: error.info?.error || "An error occurred while logging in.",
      })
    )

    console.log("error", error)
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
        mt={"5rem"}
        container
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
        <Typography variant={"h5"}>Welcome Back</Typography>
        <Typography variant="caption" mt={"0.5rem"}>
          Enter your account details to access the app.
        </Typography>
        <Grid size={12} mt={"1.8rem"}>
          <TextField
            id="email"
            onChange={emailChange}
            onBlur={emailBlur}
            value={email}
            label="Email"
            name="email"
            variant="outlined"
            error={didEmailEdit && !emailError.chk}
            fullWidth
          />
          {didEmailEdit && !emailError.chk && (
            <FormHelperText sx={{ color: "error.main" }}>
              {emailError.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid size={12} mt={"1.5rem"}>
          <FormControl fullWidth variant="outlined">
            <InputLabel
              error={didPasswordEdit && !passwordError.chk}
              htmlFor="outlined-adornment-password"
            >
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
              error={didPasswordEdit && !passwordError.chk}
              value={password}
              onChange={passwordChange}
              onBlur={passwordBlur}
              name="password"
            />
          </FormControl>
          {didPasswordEdit && !passwordError.chk && (
            <FormHelperText sx={{ color: "error.main" }}>
              {passwordError.message}
            </FormHelperText>
          )}
          <Typography
            variant="subtitle2"
            textAlign={"end"}
            mt={"0.7rem"}
            color="primary"
            sx={{
              cursor: "pointer",
            }}
            mb={0}
          >
            Forgot Password
          </Typography>
        </Grid>
        <Grid size={12} mt={"1.5rem"}>
          <Button
            disabled={!canLogin}
            onClick={handleLoginButton}
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Grid>

        <Typography variant="caption" mt={"0.7rem"}>
          Do not have an account ?{" "}
          <Link
            style={{
              color: "#22C55E",
              fontWeight: 500,
              textDecoration: "none",
            }}
            to={"/sign-up"}
          >
            Sign Up
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Login
