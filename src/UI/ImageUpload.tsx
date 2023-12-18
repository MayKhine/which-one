import * as stylex from "@stylexjs/stylex"
import { colors } from "../styleX/tokens.stylex"

type ImageUploadProps = {
  index: number
  image: string
  fileName: string
}
export const ImageUpload = ({ index, image, fileName }: ImageUploadProps) => {
  return (
    <div {...stylex.props(ImageUploadStyles.base)}>
      <div {...stylex.props(ImageUploadStyles.center)}>
        <img
          {...stylex.props(ImageUploadStyles.image)}
          key={index}
          src={image}
          alt={`image + ${index}`}
        ></img>
        <p {...stylex.props(ImageUploadStyles.text)}>{fileName}</p>
      </div>
    </div>
  )
}

const ImageUploadStyles = stylex.create({
  base: {
    width: "max-content",
    margin: "0px",
    borderRadius: "0.5rem",
    backgroundColor: colors.offwhite,
    border: "3px solid black",
  },
  text: {
    margin: "0px",
  },
  image: {
    objectFit: "scale-down",
    width: "7rem",
    height: "7rem",
    // background: "gray",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
})
