import * as stylex from "@stylexjs/stylex"

export const buttonStyles = stylex.create({
  base: {
    borderRadius: "0.3rem",
    backgroundColor: "white",
    border: "3px solid black",
    fontSize: "1.3rem",
    cursor: "pointer",
    padding: ".5rem",
    boxShadow: "8px 8px 0px rgba(0, 0, 0, 1)",
    marginLeft: "1rem",
    // " 12px 8px 0 0px white, 14px 6px 0 0px black,14px 10px 0 0px black,10px 10px 0 0px black",
  },

  plain: {
    backgroundColor: "transparent",
    border: "0px solid transparent",
    boxShadow: "0px",
    fontWeight: "600",
    margin: ".5rem",
  },

  addAnswer: {
    // backgroundColor: "pink",
    width: "3rem",
    marginBottom: "1rem",
  },

  attach: {
    backgroundColor: "pink",
    width: "3.2rem",
  },
})
