export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return {
    chk: emailRegex.test(email),
    message: "Enter a valid email.",
  }
}

export function isNotEmpty(value) {
  // Convert the value to a string and trim whitespace
  const str = String(value).trim()
  // Return true if the trimmed string has a length greater than 0
  return {
    chk: str.length > 0,
    message: "This field is required.",
  }
}

export function isInteger(value) {
  // Attempt to convert the value to a number
  const num = Number(value)

  // Check if the converted value is an integer and not NaN
  return {
    chk: Number.isInteger(num),
    message: "Enter a valid Phone Number.",
  }
}
