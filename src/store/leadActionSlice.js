import { createSlice } from "@reduxjs/toolkit"

// let actions = [
//       "Copy Phone Number",
//       "Change Status",
//       "Set Follow Up",
//       "Copy Email",
//       "Add Email",
//       "Add Phone Number",
//       "Add Response",
//       "Add Comment",
//       "View Details",
//     ]

//      let actionsCompletionMap = actions.map((action) => {
//     return {
//         leadId: null,
//       name: action,
//       isCompleted: false,
//     }
//   })

let todayLeadActions = []

const leadActionSlice = createSlice({
  name: "leadAction",
  initialState: [],
  reducers: {
    addLeadAction: (state, action) => {
      state.push({
        leadId: action.payload.leadId,
        name: action.payload.name,
        isCompleted: action.payload.isCompleted,
      })
      localStorage.setItem(
        "leadActions",
        JSON.stringify({
          leadActions: state,
        })
      )
    },
    setLeadActions: (state, action) => {
      console.log("action in lead ac: ", action)
      state = action.payload.leadActions

      console.log("st", state)
      localStorage.setItem(
        "leadActions",
        JSON.stringify({
          leadActions: state,
        })
      )
      return state
    },
  },
})

export default leadActionSlice
export const { addLeadAction, setLeadActions } = leadActionSlice.actions
