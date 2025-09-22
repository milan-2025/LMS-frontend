import * as React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useNavigate,
} from "react-router-dom"
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
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import LeadsTable from "./components/LeadsTable"
import { setLeadActions } from "./store/leadActionSlice"
import {
  getLADurationLeft,
  setLeadActionsExpirationTime,
} from "./util/leadExpirationTime"
import { startLoader, stopLoader } from "./store/loaderSlice"

function App() {
  // const dispatch = useDispatch();
  const dispatch = useDispatch()

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Login />,
            loader: async () => {
              dispatch(startLoader())
              let chk = await isLoggedIn()
              dispatch(stopLoader())
              if (chk) {
                return redirect("/leads")
              }
              return null
            },
          },
          {
            path: "/sign-up",
            element: <SignUp />,
            loader: async () => {
              dispatch(startLoader())
              let chk = await isLoggedIn()
              dispatch(stopLoader())
              if (chk) {
                return redirect("/leads")
              }
              return null
            },
          },
          {
            path: "/leads",
            element: <Leads />,
            loader: async () => {
              dispatch(startLoader())
              let chk = await isLoggedIn()
              dispatch(stopLoader())
              if (!chk) {
                return redirect("/")
              }
              return null
            },
          },
        ],
      },
    ],
    {
      basename: "/",
    }
  )
  const mode = "dark"

  // Memoize the theme object
  const theme = React.useMemo(() =>
    createTheme(
      {
        palette: {
          mode,
          primary: {
            main: "#22C55E",
          },
          secondary: {
            main: "#1C2620",
            light: "#161D1A",
          },
          text: {
            main: "#D3D3D3",
          },
        },
        // components: {
        //   MuiAutocomplete: {
        //     styleOverrides: {
        //       listbox: {
        //         // General scrollbar styling for Firefox
        //         scrollbarWidth: "thin",
        //         scrollbarColor: "#22C55E", // gray-400 and gray-200

        //         // Webkit-specific scrollbar styling (Chrome, Safari, Edge)
        //         "&::-webkit-scrollbar": {
        //           width: "4px",
        //         },
        //         "&::-webkit-scrollbar-track": {
        //           backgroundColor: "#22C55E", // gray-200
        //           borderRadius: "4px",
        //         },
        //         "&::-webkit-scrollbar-thumb": {
        //           backgroundColor: "#22C55E", // gray-400
        //           borderRadius: "4px",
        //           // border: "2px solid #e5e7eb",
        //         },
        //       },
        //     },
        //   },
        // },
      },
      []
    )
  )
  // "&::-webkit-scrollbar": {
  //     width: "4px",
  //     //   marginLeft: "2rem",
  //     //   padding: "2rem",
  //   },
  //   "&::-webkit-scrollbar-track": {
  //     backgroundColor: (theme) => theme.palette.grey[300],
  //     borderRadius: "4px",
  //   },
  //   "&::-webkit-scrollbar-thumb": {
  //     backgroundColor: (theme) => theme.palette.primary.main,
  //     borderRadius: "4px",
  //   },
  const token = useSelector((state) => state.user.token)
  const leadActions = useSelector((state) => state.leadAction)

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
      if (getLADurationLeft() > 0) {
        dispatch(
          setLeadActions({
            leadActions: JSON.parse(localStorage.getItem("leadActions"))
              .leadActions,
          })
        )
      }
    }
  }, [])
  // const navigate = useNavigate()

  React.useEffect(() => {
    if (!token) {
      return
    }

    if (isTokenExpired()) {
      dispatch(handleLogout())
      // navigate("/")
      return redirect("/")
    }
    const duration = getRemaningTokenDuration()
    let timer = setTimeout(() => {
      dispatch(handleLogout())
      // navigate("/")
      return redirect("/")
    }, duration)

    return () => clearTimeout(timer)
  }, [token])

  React.useEffect(() => {
    if (leadActions.length == 0) {
      return
    }
    if (leadActions.length == 1) {
      setLeadActionsExpirationTime()
    }
    if (getLADurationLeft() < 0) {
      localStorage.removeItem("leadActions")
      dispatch(
        setLeadActions({
          leadActions: [],
        })
      )
    }
    const lADuration = getLADurationLeft()
    let lATimer = setTimeout(() => {
      localStorage.removeItem("leadActions")
      dispatch(
        setLeadActions({
          leadActions: [],
        })
      )
    }, lADuration)
    return () => clearTimeout(lATimer)
  }, [leadActions])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kicks off a consistent baseline style, including a dark or light background */}
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
