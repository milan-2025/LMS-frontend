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

export const signupUser = async (signupData) => {
  const response = await fetch(backendBaseUrl + "/api/users/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })
  if (!response.ok) {
    let error = new Error("Error while signing up.")
    error.code = response.status
    error.info = await response.json()
    console.log("err", error)
    throw error
  }
  const data = await response.json()
  return data
}

export const uploadLeads = async (formData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(backendBaseUrl + "/api/leads/upload", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    let error = new Error("Error while uploading leads.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  let data = { message: "leads uploaded successfully" }
  return data
}

export const getLeads = async ({ queryKey }) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  if (!queryKey[1]) {
    let error = new Error("query key error")
    error.info.error = "query key error"
    throw error
  }
  const queryData = queryKey[1]
  const response = await fetch(
    backendBaseUrl + `/api/leads/get-leads?page=${queryData.page}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    let error = new Error("Error while fetching leads.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  let data = await response.json()
  return data
}

export const addPhoneNumber = async (phoneNumberData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))

  const response = await fetch(backendBaseUrl + "/api/leads/add-phone-number", {
    method: "POST",
    body: JSON.stringify(phoneNumberData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    let error = new Error("Error during adding phone number.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  return { message: "Phone number added successfully." }
}

export const getPhoneNumbers = async ({ queryKey }) => {
  const { token } = JSON.parse(localStorage.getItem("token"))

  const response = await fetch(
    backendBaseUrl +
      `/api/leads/get-phone-numbers?leadId=${queryKey[1].leadId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    let error = new Error("Error while getting phone numbers.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  const data = await response.json()
  return data
}

export const addFollowUp = async (followUpData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))

  const response = await fetch(
    backendBaseUrl + "/api/follow-up/add-follow-up",
    {
      method: "POST",
      body: JSON.stringify(followUpData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    let error = new Error("Error while adding follow up.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  return { message: "Follow up set successfully." }
}
