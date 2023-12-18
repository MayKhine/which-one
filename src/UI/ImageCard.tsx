import * as stylex from "@stylexjs/stylex"
import { colors } from "../styleX/tokens.stylex"

export type ImageCard = {
  imgSrc: string
  index: number
  text: string
}
export const ImageCard = ({ imgSrc, index, text }: ImageCard) => {
  return (
    <div {...stylex.props(imgCardStyles.base)}>
      <div {...stylex.props(imgCardStyles.imageDiv)}>
        <img
          {...stylex.props(imgCardStyles.image)}
          key={index}
          src={imgSrc}
          alt={`image + ${index}`}
        ></img>
      </div>
      <div {...stylex.props(imgCardStyles.textDiv)}>{text}</div>
    </div>
  )
}

const imgCardStyles = stylex.create({
  base: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // asignItems: "baseline",
    // alignContent: "center",
    // alignSelf: "center",
    width: "30rem",
    // height: "40rem",
    borderRadius: "0.5rem",
    backgroundColor: colors.offwhite,
    border: "3px solid black",
    boxShadow: "4px 4px 0px black",
  },

  imageDiv: {
    display: "flex",
    marginTop: "2.5rem",
    justifyContent: "center",
  },

  image: {
    objectFit: "scale-down",
    width: "25rem",
    height: "25rem",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    border: "3px solid black",
  },
  textDiv: {
    display: "flex",
    marginTop: ".5rem",
    marginBottom: "2.5rem",
    justifyContent: "center",
  },
  small: {
    width: "10rem",
  },
})
