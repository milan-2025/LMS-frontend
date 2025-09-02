import { QueryClient } from "@tanstack/react-query"

const backendBaseUrl = "http://localhost:3000"

export const queryClient = new QueryClient()

export const loginUser = async (loginData) => {
  const response = await fetch(backendBaseUrl + "/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
  if (!response.ok) {
    let error = new Error("Error while logging in.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  const data = await response.json()
  //   console.log(data)
  return data
}
