import { useEffect, useState } from "react"

export const useFormValues = (defaultValue, validationFn) => {
  const [enteredValue, setEnteredValue] = useState(defaultValue)
  const [didEdit, setDidEdit] = useState(false)
  // const [hasError,setHasError] = useState(false);
  useEffect(() => {
    if (enteredValue && enteredValue.length > 0) {
      setDidEdit(true)
    }
  }, [enteredValue])

  const handleOnValueBlur = () => {
    setDidEdit(true)
  }
  const handleOnValueChange = (event) => {
    setDidEdit(true)
    setEnteredValue(event.target.value)
  }
  let hasError = false
  if (didEdit) {
    hasError = validationFn(enteredValue)
  }

  return {
    enteredValue,
    hasError,
    didEdit,
    setDidEdit,
    setEnteredValue,
    handleOnValueBlur,
    handleOnValueChange,
  }
}
