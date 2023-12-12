type MenuButtonProps = {
  text: string
  onClickFn: () => void
}
export const MenuButton = ({ text, onClickFn }: MenuButtonProps) => {
  return (
    <button
      style={{
        borderRadius: "0.25rem",
        backgroundColor: "transparent",
        border: "0px solid transparent",
        fontWeight: "600",
        fontSize: "1.3rem",
        cursor: "pointer",
        padding: ".3rem",
        marginLeft: "0.5rem",
        // marginRight: "0.5rem",
      }}
      onClick={onClickFn}
    >
      {text}
    </button>
  )
}
