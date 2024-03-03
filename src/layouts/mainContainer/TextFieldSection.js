import React from "react"
import { TextField, createTheme, ThemeProvider } from "@mui/material"

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
          "&.Mui-focused": {
            color: "teal",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
          "&.MuiFilledInput-root::after": {
            borderBottom: "1px solid #777",
          },
        },
      },
    },
  },
})

export default function TextFieldSection({
  text,
  content,
  isListening,
  handleContentChange,
  setInputContext
}) {

  const inputRefValue = React.useRef("")

  React.useEffect(() => {
    setInputContext(inputRefValue.current.value)
    // console.log(refValue.current.childNodes[1].textContent)
  }, [text, content, isListening, setInputContext])

  return (
    <div className="TextField-Section">
      <ThemeProvider theme={theme}>
        <TextField
          multiline
          label="Text to Speech or Type Here"
          rows={10}
          variant="filled"
          fullWidth
          value={isListening ? text : content}
          onChange={(e) => handleContentChange(e, e.target.value)}
          inputRef={inputRefValue}
        />
      </ThemeProvider>
    </div>
  )
}
