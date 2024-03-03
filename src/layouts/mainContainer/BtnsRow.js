import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver"
import MicIcon from "@mui/icons-material/Mic"
import StopCircleIcon from "@mui/icons-material/StopCircle"
import DeleteIcon from "@mui/icons-material/Delete"
import { styled } from "@mui/material"
import { motion } from "framer-motion"

const StyledIconBtn = styled(IconButton)({
  margin: "0 20px !important",
  color: "#fff",
  backgroundColor: "teal",
  "&:hover": {
    backgroundColor: "rgba(0, 128, 128, .8)",
  },
  "&:focus, &.Mui-active, &.Mui-focusVisible": {
    backgroundColor: "tomato",
  },
})

const micButtonAnimation = {
  rest: {
    scale: 1,
  },
  active: {
    scale: 1.1,
    transition: {
      scale: {
        duration: 0.2,
        repeatType: "mirror",
        repeat: Infinity,
      },
    },
  },
}

const ariaLabels = ["microphone start", "microphone stop"]

export default function BtnsRow({
  isListening,
  startListening,
  stopListening,
  hasRecognitionSupport,
  toggleSpeaking,
  setText,
  setContent,
  setInputContext,
}) {
  const handleMicButton = () => {
    if (!hasRecognitionSupport) {
      alert("Sorry your browser doesn't supoort speech recognition.")
    } else if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const handleSpeakButton = () => {
    toggleSpeaking()
  }

  const handleClearButton = () => {
    setText("")
    setContent("")
    setInputContext("")
  }

  return (
    <Stack direction="row" spacing={1} justifyContent={"center"}>
      <StyledIconBtn
        aria-label="speak content"
        onClick={handleSpeakButton}
        disabled={isListening ? true : false}
      >
        <RecordVoiceOverIcon />
      </StyledIconBtn>
      <StyledIconBtn
        component={motion.button}
        aria-label={isListening ? ariaLabels[1] : ariaLabels[0]}
        onClick={handleMicButton}
        variants={micButtonAnimation}
        initial="rest"
        animate={isListening ? "active" : null}
      >
        {isListening ? <StopCircleIcon /> : <MicIcon />}
      </StyledIconBtn>
      <StyledIconBtn
        aria-label="clear content"
        onClick={handleClearButton}
        disabled={isListening ? true : false}
      >
        <DeleteIcon />
      </StyledIconBtn>
    </Stack>
  )
}
