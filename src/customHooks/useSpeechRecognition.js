import React from "react"
let recognition
if ("webkitSpeechRecognition" in window) {
  recognition = new window.webkitSpeechRecognition()
  recognition.continuous = true
}

export const useSpeechRecognition = () => {
  const [text, setText] = React.useState("")
  const [content, setContent] = React.useState("")
  const [isListening, setIsListening] = React.useState(false)

  React.useEffect(() => {
    if (!recognition) return

    recognition.onresult = (e) => {
      // console.log("onresult event: ", e)
      try {
        let transcript = Array.from(e.results)
          .map((result) => result)
          .map((result) => result[0].transcript)
          .join("")
        if (e.results[0].isFinal) {
          setText(transcript)
        }
      } catch (error) {
        console.log("Error occured:", error)
      }
    }
  }, [])

  const startListening = () => {
    setText("")
    setIsListening(true)
    recognition.start()
  }

  const stopListening = () => {
    if(text !== "") {
      setContent(text)
    }else if(content !== '') {
      setContent(content.trim())
    }else {
      setContent('')
    }
    setIsListening(false)
    recognition.stop()
  }

  const handleContentChange = (event, value) => {
    if (isListening) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      setContent(value)
    }
  }

  return {
    text,
    content,
    setText,
    setContent,
    isListening,
    startListening,
    stopListening,
    handleContentChange,
    hasRecognitionSupport: !!recognition,
  }
}
