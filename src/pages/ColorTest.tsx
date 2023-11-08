import {
  ocean,
  blue,
  darkblue,
  mango,
  persimmon,
  olivegreen,
} from "../UI/Colors"
export const ColorTest = () => {
  return (
    <div>
      <div style={{ backgroundColor: mango, height: "50px", width: "50px" }}>
        Mango
      </div>
      <div
        style={{ backgroundColor: persimmon, height: "50px", width: "50px" }}
      >
        Persimmon
      </div>
      <div style={{ backgroundColor: ocean, height: "50px", width: "50px" }}>
        ocean
      </div>
      <div style={{ backgroundColor: blue, height: "50px", width: "50px" }}>
        blue
      </div>
      <div style={{ backgroundColor: darkblue, height: "50px", width: "50px" }}>
        darkblue
      </div>{" "}
      <div
        style={{ backgroundColor: olivegreen, height: "50px", width: "50px" }}
      >
        oliveGreen
      </div>
    </div>
  )
}
