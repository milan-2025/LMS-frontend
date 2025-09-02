import * as React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Provider, useDispatch, useSelector } from "react-redux"
import store from "./store/store"
import {
  getRemaningTokenDuration,
  isLoggedIn,
  isTokenExpired,
} from "./util/authentication"
import { handleLogin, handleLogout } from "./store/userSlice"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./util/http"
import Leads from "./pages/Leads"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Login />,
        loader: () => {
          if (isLoggedIn()) {
            return redirect("/leads")
          }
          return null
        },
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        loader: () => {
          if (isLoggedIn()) {
            return redirect("/leads")
          }
          return null
        },
      },
      {
        path: "/leads",
        element: <Leads />,
        loader: () => {
          if (!isLoggedIn()) {
            return redirect("/")
          }
          return null
        },
      },
    ],
  },
])

function App() {
  const mode = "dark"

  // Memoize the theme object
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#22C55E",
          },
          secondary: {
            main: "#1C2620",
            light: "#161D1A",
          },
        },
      }),
    []
  )
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)

  React.useEffect(() => {
    // if user is logged in but redux state is not updated (like refresh site)
    if (localStorage.getItem("token") && !isTokenExpired() && !token) {
      // update redux state
      const { token: t } = JSON.parse(localStorage.getItem("token"))
      const { expirationTime: et } = JSON.parse(
        localStorage.getItem("expirationTime")
      )
      dispatch(
        handleLogin({
          token: t,
          expirationTime: et,
        })
      )
    }
  }, [])

  React.useEffect(() => {
    if (!token) {
      return
    }

    if (isTokenExpired()) {
      dispatch(handleLogout())
      return
    }
    const duration = getRemaningTokenDuration()
    let timer = setTimeout(() => {
      dispatch(handleLogout())
    }, duration)

    return () => clearTimeout(timer)
  }, [token])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kicks off a consistent baseline style, including a dark or light background */}
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
