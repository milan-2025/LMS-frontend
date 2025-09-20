import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { forwardRef, useImperativeHandle, useState } from "react"
import { getFilteredOptions } from "../util/http"

const FilterInputComponent = ({ value, field, setValue, label, tabValue }) => {
  const [open, setOpen] = useState(false)
  // const [resetclicked, setResetClicked] = useState(false)

  let queryEnabled = true

  if (value && value.trim().length > 0) {
    queryEnabled = true
  } else {
    queryEnabled = false
  }

  let {
    data: options,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      "filter",
      {
        field: field,
        value: value,
        tabValue: tabValue,
      },
    ],
    queryFn: getFilteredOptions,
    enabled: queryEnabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  if (isError) {
    console.log("err while filter", error)
  }

  return (
    <Grid size={3}>
      <Autocomplete
        // ref={ref}
        id="user-search-autocomplete"
        sx={{
          width: "100%",
        }}
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        // value={value}
        // inputValue={value}
        options={options || []}
        loading={isLoading}
        // onChange={(event, newValue) => {
        //   if (newValue) {
        //     setValue(newValue.name)
        //   }
        // }}
        onInputChange={(event, newInputValue) => {
          // setCurrentField("state")

          setValue(newInputValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            // value={value}
            label={label}
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <Box
            component="li"
            {...props}
            key={option.id}
            sx={{
              p: 2,
            }}
          >
            <Typography variant="body1">{option.name}</Typography>
          </Box>
        )}
      />
    </Grid>
  )
}

export default FilterInputComponent
