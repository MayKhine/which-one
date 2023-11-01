import { ReactNode } from "react"

type HeaderBarProps = {
  children: ReactNode
}

export const Header: React.FC<HeaderBarProps> = ({ children }) => {
  return (
    <div style={{ backgroundColor: "lightgray", height: "40px" }}>
      {children}
    </div>
  )
}
