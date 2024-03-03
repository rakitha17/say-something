import * as React from "react"
import Button from "@mui/material/Button"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { styled } from "@mui/material"
import useClipboard from "react-use-clipboard"

const StyledButton = styled(Button)({
  fontFamily: "inherit",
  backgroundColor: "teal",
  "&:hover": {
    backgroundColor: "rgba(0, 128, 128, .8)",
  },
})

export default function BottomRow({ inputContext, isListening }) {
  const [isCopied, setCopied] = useClipboard(inputContext, {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 10000,
  })

  return (
    <StyledButton
      variant="contained"
      startIcon={<ContentCopyIcon />}
      onClick={setCopied}
      disabled={isListening && true}
    >
      {isCopied ? "Copied" : "Copy"}
    </StyledButton>
  )
}
