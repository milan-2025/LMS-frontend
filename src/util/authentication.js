export const handleLocalStorageLogin = (token, expirationTime) => {
  localStorage.setItem(
    "token",
    JSON.stringify({
      token: token,
    })
  )
  localStorage.setItem(
    "expirationTime",
    JSON.stringify({
      expirationTime: expirationTime,
    })
  )
}

// export const getToken = () => {
//   const { token } = JSON.parse(localStorage.getItem("token"))
//   return token
// }

// export const getExpirationTime = () => {
//   const { expirationTime } = JSON.parse(localStorage.getItem("expirationTime"))
//   return expirationTime
// }
export const isTokenExpired = () => {
  if (localStorage.getItem("expirationTime")) {
    const { expirationTime } = JSON.parse(
      localStorage.getItem("expirationTime")
    )
    if (expirationTime) {
      const duration = expirationTime - Date.now()
      if (duration > 0) {
        return false
      } else {
        return true
      }
    }
    return true
  } else {
    return true
  }
}

export const getRemaningTokenDuration = () => {
  if (localStorage.getItem("expirationTime")) {
    const { expirationTime } = JSON.parse(
      localStorage.getItem("expirationTime")
    )

    if (expirationTime) {
      const duration = expirationTime - Date.now()
      return duration
    }
    return -1
  } else {
    return -1
  }
}

export const handleLocalStorageLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("expirationTime")
}

// export const isLoggedIn = () => {
//   if (localStorage.getItem("token") && !isTokenExpired()) {
//     return true
//   }
//   return false
// }

export const isLoggedIn = async () => {
  if (localStorage.getItem("token")) {
    const { token } = JSON.parse(localStorage.getItem("token"))

    if (!token) {
      // If no token exists, immediately redirect to login
      // throw redirect("/login");
      return false
    }

    if (isTokenExpired()) {
      return false
    }

    try {
      // Send the token to your backend for validation
      const response = await fetch(
        "https://univasion-crm-backend.onrender.com/api/users/validate-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        // If the backend says the token is invalid, redirect
        // throw redirect("/login");
        return false
      }

      // Optionally, you can return a user object from the backend response
      // const data = await response.json();
      // return data.user;
      return true
    } catch (error) {
      // Catch any network or other errors and redirect
      console.error("Token validation failed:", error)
      // throw redirect("/login");
      return false
    }
  } else {
    return false
  }
}
