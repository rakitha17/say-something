import React from "react"
import VoiceSelector from "./mainContainer/VoiceSelector"
import Sliders from "./mainContainer/Sliders"
import BtnsRow from "./mainContainer/BtnsRow"
import TextFieldSection from "./mainContainer/TextFieldSection"
import BottomRow from "./mainContainer/BottomRow"
import { useMediaQuery } from "@mui/material"
//LINK - utils
import { useSpeechRecognition } from "../customHooks/useSpeechRecognition"
import { useSpeechSynthesis } from "../customHooks/useSpeechSynthesis"

export default function MainContainer() {
  let minWidth600 = useMediaQuery("(min-width: 600px)")

  const {
    text,
    content,
    setText,
    setContent,
    isListening,
    startListening,
    stopListening,
    handleContentChange,
    hasRecognitionSupport,
  } = useSpeechRecognition()

  const {
    voiceList,
    handleVoiceChange,
    inputContext,
    setInputContext,
    toggleSpeaking,
    handlePitchRateSliders,
  } = useSpeechSynthesis()

  return (
    <div
      className="Main-Container"
      style={{
        width: minWidth600 ? "50%" : "90%",
        padding: "20px",
        backgroundColor: "#FFFAF0",
        position: "absolute",
        left: "50%",
        top: "50%",
        translate: "-50% -50%",
        borderRadius: "10px",
        boxShadow: "0 3px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <VoiceSelector
          voiceList={voiceList}
          handleVoiceChange={handleVoiceChange}
          isListening={isListening}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Sliders
          handlePitchRateSliders={handlePitchRateSliders}
          isListening={isListening}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <BtnsRow
          isListening={isListening}
          startListening={startListening}
          stopListening={stopListening}
          hasRecognitionSupport={hasRecognitionSupport}
          toggleSpeaking={toggleSpeaking}
          setText={setText}
          setContent={setContent}
          setInputContext={setInputContext}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <TextFieldSection
          text={text}
          content={content}
          isListening={isListening}
          handleContentChange={handleContentChange}
          setInputContext={setInputContext}
        />
      </div>
      <div style={{ textAlign: "end" }}>
        <BottomRow
          inputContext={inputContext}
          isListening={isListening}
        />
      </div>
    </div>
  )
}
