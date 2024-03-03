import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import { ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#696969",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #696969",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#000 !important",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "10px",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
          whiteSpace: "wrap",
          textOverflow: "ellipsis",
          "&:hover": {
            backgroundColor: "#DCDCDC",
            color: "#000",
          },
          "&.Mui-selected": {
            backgroundColor: "#696969 !important",
            color: "#fff !important",
          },
        },
      },
    },
  },
})

export default function VoiceSelector({
  voiceList,
  handleVoiceChange,
  isListening,
}) {
  const [voice, setVoice] = React.useState("default")

  const handleChange = (event) => {
    if (!isListening) {
      setVoice(event.target.value)
      handleVoiceChange(event.target.value)
    }
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <ThemeProvider theme={theme}>
        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            shrink
            style={{ color: "#777", fontFamily: "inherit" }}
          >
            Voice
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={voice}
            label="Voice"
            displayEmpty
            onChange={handleChange}
            style={{ fontFamily: "inherit" }}
            disabled={isListening ? true : false}
          >
            <MenuItem value="default">
              <em>Select a voice</em>
            </MenuItem>
            {voiceList.map((val, index) => {
              return (
                <MenuItem key={index} value={index}>
                  {val.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </ThemeProvider>
    </Box>
  )
}
