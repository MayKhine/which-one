export type InputDivProps = {
  label: string
  type: string
  identifier: string | number
  index: number
  onChangeFn: (
    identifier: string | number,
    value: string | number,
    index: number
  ) => void
}

export const InputDiv = ({
  label,
  type,
  index,
  onChangeFn,
  identifier,
}: InputDivProps) => {
  return (
    <div>
      <label>{label}</label>
      <input
        required
        type={type}
        onChange={(event) => {
          onChangeFn(identifier, event?.target.value, index)
        }}
      ></input>
    </div>
  )
}
