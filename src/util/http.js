import { QueryClient } from "@tanstack/react-query"
import { chkAndReplaceFollowUpIds } from "./followups"

// const backendBaseUrl = "http://localhost:3000"
const backendBaseUrl = "https://univasion-crm-backend.onrender.com"

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
  console.log("query tab value-", queryData.tabValue)
  let response = null
  if (queryData.tabValue == "Follow Ups") {
    response = await fetch(
      backendBaseUrl + `/api/follow-up/get-follow-up?page=${queryData.page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } else if (queryData.tabValue == "All") {
    response = await fetch(
      backendBaseUrl + `/api/leads/get-leads?page=${queryData.page}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } else if (queryData.tabValue == "Hot Leads") {
    response = await fetch(
      backendBaseUrl +
        `/api/leads/get-hot-leads?page=${queryData.page}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }
  if (!response.ok) {
    let error = new Error("Error while fetching leads.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  if (queryData.tabValue == "Follow Ups") {
    let data = await response.json()
    let leads = data.pendingFollowUps.map((item) => {
      return {
        ...item.lead,
        timeZone: item.timeZone,
        date: item.date,
      }
    })
    delete data.pendingFollowUps
    data.leads = leads
    return data
  }
  if (queryData.tabValue == "Hot Leads") {
    let data = await response.json()
    let leads = data.hotLeads.map((item) => {
      return {
        ...item.lead,
      }
    })
    delete data.hotLeads
    data.leads = leads
    return data
  }
  let data = await response.json()

  return data
}

export const addPhoneNumber = async (phoneNumberData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  let url = ""
  url = !phoneNumberData.isEmail
    ? "/api/leads/add-phone-number"
    : "/api/leads/add-email"
  const response = await fetch(backendBaseUrl + url, {
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
  return {
    message: !phoneNumberData.isEmail
      ? "Phone number added successfully."
      : "Email added successfully",
  }
}

export const getPhoneNumbers = async ({ queryKey }) => {
  const { token } = JSON.parse(localStorage.getItem("token"))

  let url = ""

  url = !queryKey[1].isEmail
    ? `/api/leads/get-phone-numbers?leadId=${queryKey[1].leadId}`
    : `/api/leads/get-emails?leadId=${queryKey[1].leadId}`

  const response = await fetch(backendBaseUrl + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
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
  chkAndReplaceFollowUpIds(followUpData.leadId)

  return { message: "Follow up set successfully." }
}

export const getFollowUpIds = async () => {
  const { token } = JSON.parse(localStorage.getItem("token"))

  const response = await fetch(
    backendBaseUrl + "/api/follow-up/get-follow-up-ids",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    let error = new Error("Error during fetching follow up length")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  let data = await response.json()
  let mappedData = data.ids.map((item) => {
    return item.lead
  })
  return mappedData
}

export const addResponse = async (responseData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))

  const response = await fetch(backendBaseUrl + "/api/leads/add-response", {
    method: "POST",
    body: JSON.stringify(responseData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    let error = new Error("Error whule adding the response.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  return { message: "response added successfully." }
}

export const addComment = async (commentData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(backendBaseUrl + "/api/leads/add-comment", {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    let error = new Error("Error whule adding the comment.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  return { message: "Comment added successfully." }
}

export const getFilteredOptions = async ({ queryKey }) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  let url = `${backendBaseUrl}/api/leads/filtered-options?field=${queryKey[1].field}&value=${queryKey[1].value}&tbValue=${queryKey[1].tabValue}`
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    let error = new Error("Error while getting filtered options.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data = await response.json()
  console.log("data", data)
  if (queryKey[1].tabValue == "Follow Ups") {
    let mappedOptions = data.options.map((item) => {
      let field = queryKey[1].field
      return {
        name: item.lead[field],
        id: item._id,
      }
    })
    return mappedOptions
  }
  if (queryKey[1].tabValue == "Hot Leads") {
    let mappedOptions = data.options.map((item) => {
      let field = queryKey[1].field
      return {
        name: item.lead[field],
        id: item._id,
      }
    })
    return mappedOptions
  }
  let mappedOptions = data.options.map((item) => {
    let field = queryKey[1].field
    return {
      name: item[field],
      id: item._id,
    }
  })
  return mappedOptions
}

export const getFilteredLeads = async (filterData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))

  let url = "/api/leads/get-filtered-leads"

  if (filterData.tabValue == "Follow Ups") {
    url = url + "/follow-up"
  }
  if (filterData.tabValue == "Hot Leads") {
    url = url + "/hot-leads"
  }

  const response = await fetch(backendBaseUrl + url, {
    method: "POST",
    body: JSON.stringify(filterData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    let error = new Error("Error while getting filtered data.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  if (filterData.tabValue == "Follow Ups") {
    let data = await response.json()
    console.log("fl-http", data)
    let leads = data.filteredFollowUps.map((item) => {
      return {
        ...item.lead,
        timeZone: item.timeZone,
        date: item.date,
      }
    })
    delete data.filteredFollowUps
    data.filteredLeads = leads
    return data
  }
  if (filterData.tabValue == "Hot Leads") {
    let data = await response.json()
    console.log("fl-http", data)
    let leads = data.filteredHotLeads.map((item) => {
      return {
        ...item.lead,
      }
    })
    delete data.filteredHotLeads
    data.filteredLeads = leads
    return data
  }
  let data = await response.json()

  return data
}

export const getLeadInfoById = async ({ queryKey }) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(
    backendBaseUrl +
      "/api/leads/get-lead-info-by-id?leadId=" +
      queryKey[1].leadId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    let error = new Error("Error while getting filtered data.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  let data = await response.json()
  return data.lead
}

export const getFollowUPInfo = async ({ queryKey }) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(
    backendBaseUrl +
      "/api/follow-up/get-follow-up-info?leadId=" +
      queryKey[2].leadId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    let error = new Error("Error while getting filtered data.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  let data = await response.json()
  return data
}

export const getResponses = async ({ queryKey }) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(
    backendBaseUrl + "/api/leads/get-responses?leadId=" + queryKey[2].leadId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    let error = new Error("Error while getting responses.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  let data = await response.json()
  return data
}

export const getComments = async ({ queryKey }) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(
    backendBaseUrl + "/api/leads/get-comments?leadId=" + queryKey[2].leadId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!response.ok) {
    let error = new Error("Error while getting comments.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  let data = await response.json()
  return data
}

export const chkHotLead = async (hotLeadData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(backendBaseUrl + "/api/leads/chk-hot-lead", {
    method: "POST",
    body: JSON.stringify(hotLeadData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    let error = new Error("Error whule adding the hot lead.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  // return { message: "Lead added to Hot Leads." }
  let data = await response.json()
  return data
}

export const addHotLead = async (hotLeadData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(backendBaseUrl + "/api/leads/add-hot-lead", {
    method: "POST",
    body: JSON.stringify(hotLeadData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    let error = new Error("Error whule adding the hot lead.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  return { message: "Lead added to Hot Leads." }
}

export const removeHotLead = async (hotLeadData) => {
  const { token } = JSON.parse(localStorage.getItem("token"))
  const response = await fetch(backendBaseUrl + "/api/leads/remove-hot-lead", {
    method: "POST",
    body: JSON.stringify(hotLeadData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    let error = new Error("Error whule adding the hot lead.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }
  return { message: "Lead removed from Hot Leads." }
}
