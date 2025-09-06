import {
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
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormValues } from "../hooks/useFormValues"
import {
  doConfimPasswordMatch,
  isNotEmpty,
  isValidEmail,
} from "../util/validation"
import { useMutation } from "@tanstack/react-query"
import { signupUser } from "../util/http"
import { useDispatch } from "react-redux"
import { startLoader, stopLoader } from "../store/loaderSlice"
import { showAlert } from "../store/AlertSlice"
import { handleLogin } from "../store/userSlice"

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

  const {
    enteredValue: fullName,
    handleOnValueBlur: fullNameBlur,
    handleOnValueChange: fullNameChange,
    hasError: fullNameError,
    didEdit: fullNameEdit,
  } = useFormValues("", (value) => {
    return isNotEmpty(value)
  })
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

  const {
    enteredValue: confirmPassword,
    setEnteredValue: setconfirmPassword,
    handleOnValueBlur: confirmPasswordBlur,
    handleOnValueChange: confirmPasswordChange,
    hasError: confirmPasswordError,
    didEdit: didconfirmPasswordEdit,
  } = useFormValues("", (value) => {
    if (isNotEmpty(value).chk) {
      return doConfimPasswordMatch(value, password)
    } else {
      return isNotEmpty(value)
    }
  })
  const navigate = useNavigate()
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: signupUser,
    retry: false,
    onSuccess: (data) => {
      console.log("data", data)
      dispatch(stopLoader())
      let exp = Date.now() + 1 * 60 * 60 * 1000
      dispatch(
        handleLogin({
          token: data.token,
          expirationTime: exp,
        })
      )
      navigate("/leads")
    },
  })

  const handleSignUpButton = () => {
    if (
      didEmailEdit &&
      didPasswordEdit &&
      didconfirmPasswordEdit &&
      fullNameEdit &&
      emailError.chk &&
      passwordError.chk &&
      fullNameError.chk &&
      confirmPasswordError.chk
    ) {
      mutate({
        fullName,
        email,
        password,
      })
    } else {
      emailBlur()
      fullNameBlur()
      passwordBlur()
      confirmPasswordBlur()
    }
  }
  const dispatch = useDispatch()
  if (isPending) {
    dispatch(startLoader())
  }
  if (isError) {
    dispatch(stopLoader())
    dispatch(
      showAlert({
        isVisible: true,
        severity: "error",
        message: error.info?.error || "An error occurred while sigining up.",
      })
    )
  }
  const [canSignUp, setCanSignUp] = useState(false)
  useEffect(() => {
    if (
      didEmailEdit &&
      didPasswordEdit &&
      didconfirmPasswordEdit &&
      fullNameEdit &&
      emailError.chk &&
      passwordError.chk &&
      fullNameError.chk &&
      confirmPasswordError.chk
    ) {
      setCanSignUp(true)
    } else {
      setCanSignUp(false)
    }
  }, [emailError, fullNameError, passwordError, confirmPasswordError])

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
        mt={"5rem"}
        mb={"5rem"}
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
            onChange={fullNameChange}
            onBlur={fullNameBlur}
            value={fullName}
            error={fullNameEdit && !fullNameError.chk}
            fullWidth
          />
          {fullNameEdit && !fullNameError.chk && (
            <FormHelperText sx={{ color: "error.main" }}>
              {fullNameError.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid size={12} mt={"1.5rem"}>
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
          <Grid size={12} mt={"1.5rem"}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                error={didconfirmPasswordEdit && !confirmPasswordError.chk}
                htmlFor="outlined-adornment-Confirmpassword"
              >
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
                error={didconfirmPasswordEdit && !confirmPasswordError.chk}
                value={confirmPassword}
                onChange={confirmPasswordChange}
                onBlur={confirmPasswordBlur}
              />
            </FormControl>
            {didconfirmPasswordEdit && !confirmPasswordError.chk && (
              <FormHelperText sx={{ color: "error.main" }}>
                {confirmPasswordError.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid size={12} mt={"1.8rem"} mb={"0.7rem"}>
            <Button
              onClick={handleSignUpButton}
              fullWidth
              variant="contained"
              color="primary"
              disabled={!canSignUp}
            >
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
