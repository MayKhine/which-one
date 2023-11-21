type ProfileImgType = {
  image: string
  size: string
}
export const ProfileImg = ({ image, size }: ProfileImgType) => {
  return (
    <img
      style={{ borderRadius: "50%", maxWidth: size || "120px" }}
      src={image}
    />
  )
}
