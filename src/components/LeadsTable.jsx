import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material"
import { useState } from "react"
import CopyPhoneNumberModal from "./CopyPhoneNumberModal"
import ActionRow from "./ActionRow"

const LeadsTable = ({ fetchedLeads, leads }) => {
  const theme = useTheme()

  return (
    <>
      <TableContainer
        sx={{
          borderRadius: "25px",
          // borderTopRightRadius: "25px",
          marginTop: "3rem",
          boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
          "&::-webkit-scrollbar": {
            height: 8, // Adjust height for horizontal scrollbar
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: (theme) => theme.palette.text.main,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: (theme) => theme.palette.primary.main,
            borderRadius: 2,
          },

          // padding: "1rem",
        }}
      >
        <Table
          sx={{
            minWidth: 650,
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "secondary.main",
                color: theme.palette.text.main,
                whiteSpace: "nowrap",
              }}
            >
              <TableCell
                sx={{
                  paddingLeft: "3rem",
                }}
              >
                Company
              </TableCell>
              {/* <TableCell>Address</TableCell> */}
              <TableCell sx={{ whiteSpace: "nowrap" }}>State</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Time Zone</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Status</TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedLeads.map((lead, rowIndex) => {
              // if(index == 5){
              //   return <ActionRow key={lead._id} leadId = {lead._id} />
              // }
              return (
                <TableRow
                  key={lead._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  {Object.values(lead).map((val, colIndex) => {
                    if (colIndex == 0) {
                    } else if (colIndex == 5) {
                      return (
                        <TableCell
                          sx={{ whiteSpace: "nowrap" }}
                          key={val + colIndex}
                        >
                          <ActionRow
                            lead={leads.find(
                              (mylead) => mylead._id == lead._id
                            )}
                            actions={val}
                          />
                        </TableCell>
                      )
                    } else {
                      return (
                        <TableCell
                          sx={{ whiteSpace: "nowrap" }}
                          key={val + colIndex}
                        >
                          {val}
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              )
            })}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default LeadsTable
