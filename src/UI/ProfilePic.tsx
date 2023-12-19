import * as stylex from "@stylexjs/stylex"

type ProfilePicType = {
  image: string
  size: string
}
export const ProfilePic = ({ image, size }: ProfilePicType) => {
  return (
    <img
      {...stylex.props(
        profilePicStyles.base,
        profilePicStyles.dynamicWidth(size)
      )}
      src={image}
    />
  )
}

const profilePicStyles = stylex.create({
  base: {
    borderRadius: "50%",
    border: "2.5px solid black",
  },
  dynamicWidth: (w) => ({
    width: `${w}`,
  }),
})
