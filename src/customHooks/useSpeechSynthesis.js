import React from "react"

let uttrThis
let synth

if ("SpeechSynthesis" in window) {
  uttrThis = new SpeechSynthesisUtterance()
  synth = window.speechSynthesis
}

export const useSpeechSynthesis = () => {
  const [voiceList, setVoiceList] = React.useState([])
  const [selectedVoice, setSelectedVoice] = React.useState("default")
  const [inputContext, setInputContext] = React.useState("")
  const [sliderStat, setSliderStat] = React.useState({
    name: '',
    value: 0
  })

  const populateVoiceList = React.useCallback(() => {
    let voices = synth.getVoices()
    let engVoices = voices
      .filter((voice) => voice.lang.includes("en"))
      .map((voice) => voice)

    setVoiceList(engVoices)
  }, [])

  React.useEffect(() => {
    populateVoiceList()
  }, [populateVoiceList])

  React.useEffect(() => {
    synth.cancel()
  }, [])

  const handlePitchRateSliders = (name, value) => {
    setSliderStat({
      name,
      value
    })
  }

  const handleVoiceChange = (value) => {
    setSelectedVoice(value)
  }

  const toggleSpeaking = (startover = true) => {
    synth.cancel()
    if (startover) {
      if (inputContext === "") {
        alert("Nothing to read.")
      } else {
        uttrThis.text = inputContext
        if (selectedVoice !== "default") {
          uttrThis.voice = voiceList[selectedVoice]
          uttrThis[sliderStat.name] = sliderStat.value
          synth.speak(uttrThis)
        } else {
          alert("Please select one of the given voices.")
        }
      }
    }
  }

  return {
    voiceList,
    handleVoiceChange,
    inputContext,
    setInputContext,
    toggleSpeaking,
    handlePitchRateSliders
  }
}