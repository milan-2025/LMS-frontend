import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getFilteredOptions } from "../util/http"

const FilterInputComponent = ({ value, field, setValue, label }) => {
  const [open, setOpen] = useState(false)

  const {
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
      },
    ],
    queryFn: getFilteredOptions,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  if (isError) {
    console.log("err while filter", error)
  }

  return (
    <Grid size={3}>
      <Autocomplete
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
        options={options || []}
        loading={isLoading}
        onInputChange={(event, newInputValue) => {
          // setCurrentField("state")
          setValue(newInputValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
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
