import { Button } from "./Button"
import { colors } from "../styleX/tokens.stylex"
import * as stylex from "@stylexjs/stylex"
type PopUpModalProps = {
  text: string
  button1Text: string
  button2Text?: string
  button1Fn: () => void
  button2Fn?: () => void
}

export const PopUpModal = ({
  text,
  button1Text,
  button2Text,
  button1Fn,
  button2Fn,
}: PopUpModalProps) => {
  return (
    <div {...stylex.props(popUpModalStyles.base)}>
      <div {...stylex.props(popUpModalStyles.popup)}>
        <div> {text}</div>
        <div {...stylex.props(popUpModalStyles.buttonDiv)}>
          <Button text={button1Text} onClickFn={button1Fn} />
          {button2Text && <Button text={button2Text} onClickFn={button2Fn} />}
        </div>
      </div>
    </div>
  )
}

const popUpModalStyles = stylex.create({
  base: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: "99",
    overflow: "hidden",
  },
  popup: {
    posision: "fixed",
    margin: "20%",
    // height: "10%",
    // width: "80%",
    zIndex: "100",
    overflow: "hidden",
    background: colors.yellow,
    borderRadius: "1rem",
    padding: "1.5rem",
    border: ".2rem solid black",
    display: "flex",
    flexDirection: "column",
  },
  buttonDiv: {
    alignSelf: "flex-end",
    marginTop: "1rem",
  },
})
