export type UserProps = {
  name: string
  email: string
  id: number
  year: number
  password: string
}

export const User = ({ name, email, id, year, password }: UserProps) => {
  return (
    <div style={{ backgroundColor: "lightblue" }}>
      {name}
      <p>{id}</p>
      <p>{email}</p>
      <p>{year}</p>
      <p>{password}</p>
    </div>
  )
}
