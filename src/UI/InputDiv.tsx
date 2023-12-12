import { inputStyle } from "./Styles"

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
      required
      style={inputStyle}
      type={type}
      onSelect={onSelectFn}
      onChange={(event) => {
        onChangeFn(identifier, event?.target.value, index)
      }}
    ></input>
  )
}
