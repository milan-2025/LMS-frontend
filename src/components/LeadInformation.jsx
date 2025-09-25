import { Button, Grid, Typography } from "@mui/material"
import CopyPhoneNumberModal from "./CopyPhoneNumberModal"
import { useState } from "react"

const LeadInformation = ({ data }) => {
  const [openViewPhoneNumbers, setOpenViewPhoneNumbers] = useState(false)
  const [openViewEmails, setOpenViewEmails] = useState(false)

  return (
    data && (
      <>
        <Grid size={12}>
          <Typography variant="h5">Lead Details</Typography>
          <Typography color="text.main" variant="subtitle2">
            Review and manage lead information for{" "}
            <span
              style={{
                fontWeight: 500,
                color: "#FFFFFF",
              }}
            >
              {data.shipper}
            </span>
          </Typography>
        </Grid>
        <Grid
          size={12}
          bgcolor={"secondary.main"}
          borderRadius={"1.2rem"}
          mt={"1.2rem"}
          padding={"1.2rem"}
          // sx={{
          //   boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
          // }}
          // height={400}
        >
          <Grid mb={"1.2rem"} size={12}>
            <Typography variant="body1">Lead Information</Typography>
          </Grid>

          <Grid mb={"1.2rem"} container size={12}>
            <Grid size={6}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                Shipper Name
              </Typography>
              <Typography variant="body2">
                {data.shipper ? data.shipper : "NA"}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                State
              </Typography>
              <Typography variant="body2">
                {data.state ? data.state : "NA"}
              </Typography>
            </Grid>
          </Grid>
          <Grid mb={"1.2rem"} container size={12}>
            <Grid size={6}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                Time Zone
              </Typography>
              <Typography variant="body2">
                {data.timeZone ? data.timeZone.toUpperCase() : "NA"}
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                Commodity
              </Typography>
              <Typography variant="body2">
                {data.commodity ? data.commodity : "NA"}
              </Typography>
            </Grid>
          </Grid>
          <Grid mb={"1.2rem"} container size={12}>
            <Grid size={6}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                Phone Number
              </Typography>
              <Typography variant="body2">
                {data.phoneNumber ? data.phoneNumber : "NA"}
              </Typography>
              <Typography
                ml={"0.1rem"}
                color="primary"
                size="small"
                variant="caption"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenViewPhoneNumbers(true)
                }}
              >
                View More
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                Email
              </Typography>
              <Typography variant="body2">
                {data.email ? data.email : "NA"}
              </Typography>
              <Typography
                ml={"0.1rem"}
                color="primary"
                size="small"
                variant="caption"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpenViewEmails(true)
                }}
              >
                View More
              </Typography>
            </Grid>
          </Grid>
          <Grid mb={"1.2rem"} container size={12}>
            <Grid size={6}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                Contact Person Name
              </Typography>
              <Typography variant="body2">
                {data.contactPerson ? data.contactPerson : "NA"}
              </Typography>
              {!data.contactPerson && (
                <Typography
                  ml={"0.1rem"}
                  color="primary"
                  size="small"
                  variant="caption"
                  sx={{
                    cursor: "pointer",
                  }}
                  // onClick={handleAddName}
                >
                  Add Name
                </Typography>
              )}
            </Grid>
            <Grid size={6}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                Status
              </Typography>
              <Typography variant="body2">{data.status}</Typography>
              {/* <Typography
            ml={"0.1rem"}
            color="primary"
            size="small"
            variant="caption"
            sx={{
              cursor: "pointer",
            }}
          >
            View More
          </Typography> */}
            </Grid>
          </Grid>

          <Grid mb={"1.2rem"} container size={12}>
            <Grid size={12}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                Address
              </Typography>
              <Typography variant="body2">
                {data.address ? data.address : "NA"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container size={12}>
            <Grid size={12}>
              <Typography
                mb={"0.3rem"}
                fontSize={"0.85rem"}
                color="text.main"
                variant="body2"
              >
                Website
              </Typography>
              {data.website && (
                <Typography variant="body2" component={"a"}>
                  {data.website}
                </Typography>
              )}
              {!data.website && <Typography variant="body2">NA</Typography>}
            </Grid>
          </Grid>
        </Grid>

        {openViewPhoneNumbers && (
          <CopyPhoneNumberModal
            openModal={openViewPhoneNumbers}
            setOpenModal={setOpenViewPhoneNumbers}
            phoneNumber={data.phoneNumber}
            leadId={data._id}
            isEmail={false}
          />
        )}
        {openViewEmails && (
          <CopyPhoneNumberModal
            openModal={openViewEmails}
            setOpenModal={setOpenViewEmails}
            phoneNumber={data.email}
            leadId={data._id}
            isEmail={true}
          />
        )}
      </>
    )
  )
}

export default LeadInformation
