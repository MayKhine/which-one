import * as stylex from "@stylexjs/stylex"
import { textStyles } from "../styleX/textStyles"

export type InputDivProps = {
  type: string
  identifier: string | number
  index: number
  onChangeFn: (identifier: string, value: string, index: number) => void
  onSelectFn?: () => void
}

export const InputDiv = ({
  type,
  index,
  onChangeFn,
  onSelectFn,
  identifier,
}: InputDivProps) => {
  return (
    <input
      {...stylex.props(textStyles.input)}
      required
      type={type}
      onSelect={onSelectFn}
      onChange={(event) => {
        onChangeFn(identifier, event?.target.value, index)
      }}
    ></input>
  )
}
