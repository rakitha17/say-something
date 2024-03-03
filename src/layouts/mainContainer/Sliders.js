import * as React from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import { Typography, styled } from "@mui/material"

const sliderLabels = [
  { label: "Pitch", name: "pitch" },
  { label: "Rate", name: "rate" },
]

const StyledSlider = styled(Slider)({
  color: "teal",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
})

function valuetext(value) {
  return `${value}°C`
}

export default function Sliders({ handlePitchRateSliders, isListening }) {
  const handleSliders = React.useCallback((e) => {
    let name = e.target.name
    let value = e.target.value

    handlePitchRateSliders(name, value)
  }, [handlePitchRateSliders])

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {sliderLabels.map((val, index) => {
        return (
          <Box key={index} sx={{ width: "45%" }}>
            <Typography
              style={{
                fontFamily: "inherit",
                fontSize: "1rem",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              {val.label}
            </Typography>
            <StyledSlider
              aria-label={val.name}
              name={val.name}
              defaultValue={0}
              min={-5}
              max={5}
              step={1}
              getAriaValueText={valuetext}
              color="secondary"
              disabled={isListening && true}
              onChange={handleSliders}
            />
          </Box>
        )
      })}
    </div>
  )
}
