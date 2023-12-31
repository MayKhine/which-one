import * as stylex from "@stylexjs/stylex"
import { colors } from "./tokens.stylex"

export const textStyles = stylex.create({
  base: {
    fontSize: "1.5rem",
    fontWeight: "600",
  },

  label: {
    fontSize: "1.5rem",
  },

  input: {
    backgroundColor: colors.yellow,
    width: "100%",
    border: ".2rem solid black",
    borderRadius: "0.4rem",
    // marginTop: ".5rem",
    padding: ".5rem",
  },

  inputQuesion: {
    width: "calc(100% - 1.3rem)",
  },

  searchInput: {
    backgroundColor: colors.orange,
    width: "20vw",
    border: ".2rem solid black",
    borderRadius: "0.4rem",
    marginTop: ".5rem",
    padding: ".5rem",
    marginRight: ".5rem",
  },
})
