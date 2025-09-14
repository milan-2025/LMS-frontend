export const getLADurationLeft = () => {
  if (localStorage.getItem("leadActionExpiry")) {
    let expiry = Number(localStorage.getItem("leadActionExpiry"))
    let now = Date.now()
    if (now > expiry) {
      return -1
    } else {
      return expiry - now
    }
  }
  return -1
}

export const setLeadActionsExpirationTime = () => {
  if (getLADurationLeft() < 0) {
    let expiry = Date.now() + 9 * 60 * 60 * 1000
    localStorage.setItem("leadActionExpiry", String(expiry))
  }
}
