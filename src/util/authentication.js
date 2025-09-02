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
  const { expirationTime } = JSON.parse(localStorage.getItem("expirationTime"))
  if (expirationTime) {
    const duration = expirationTime - Date.now()
    if (duration > 0) {
      return false
    } else {
      return true
    }
  }
  return true
}

export const getRemaningTokenDuration = () => {
  const { expirationTime } = JSON.parse(localStorage.getItem("expirationTime"))

  if (expirationTime) {
    const duration = expirationTime - Date.now()
    return duration
  }
  return -1
}

export const handleLocalStorageLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("expirationTime")
}

export const isLoggedIn = () => {
  if (localStorage.getItem("token") && !isTokenExpired()) {
    return true
  }
  return false
}
