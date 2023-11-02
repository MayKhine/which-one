import { useState } from "react"
import { NewUserProps } from "./Register"

type UserFormProps = {
  registerNewUser: (user: NewUserProps) => void
}

export const UserForm = ({ registerNewUser }: UserFormProps) => {
  const [enteredValues, setEnteredValues] = useState({})
  const [yearValid, setYearValid] = useState(true)
  const [passwordError, setPasswordError] = useState("")
  const [nameError, setNameError] = useState("")

  const resetStates = () => {
    setYearValid(true)
    setPasswordError("")
    setNameError("")
    setEnteredValues({
      name: "",
      email: "",
      year: "",
      password: "",
      password2: "",
      id: "",
    })
  }
  const inputChangeHandler = (identifier: string, value: string | number) => {
    console.log("InputChangeHandler is triggered", value)

    setEnteredValues((prevVal) => ({
      ...prevVal,
      [identifier]: value,
    }))
  }

  const validateUserName = (name: string) => {
    const notNameRegex = /[^a-z0-9]/
    if (!notNameRegex.test(name) && name.length >= 3) {
      setNameError("")
      return true
    } else {
      setNameError(
        "Name needs to be longer than 3 characters, and contains only small letters and numbers"
      )
      return false
    }
  }

  const validateYearBorn = (year: string) => {
    const currentYear = new Date().getFullYear()
    if (!isNaN(year) && year.length == 4 && year <= currentYear) {
      setYearValid(true)
      return true
    }
    setYearValid(false)

    return false
  }

  const validatePasswords = (password: string, password2: string) => {
    // Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    const notPasswordRegex = /^(.{0,6}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/

    if (notPasswordRegex.test(password)) {
      setPasswordError(
        "password should contain atleast one number and one special character"
      )
      return false
    }

    if (password === password2) {
      setPasswordError("")
      return true
    }
    setPasswordError("Passwords must match.")
    return false
  }

  const submitButtonHandler = () => {
    event?.preventDefault()
    console.log("form  is clicked and enteredValues: ", enteredValues)
    const emailValidation = enteredValues.email.trim().length > 0
    const yearValidation = validateYearBorn(enteredValues.year)
    const passwordValidation = validatePasswords(
      enteredValues.password,
      enteredValues.password2
    )
    const nameValidation = validateUserName(enteredValues.name)

    if (yearValidation && passwordValidation && nameValidation) {
      const newUser: NewUserProps = {
        name: enteredValues.name,
        year: enteredValues.year,
        password: enteredValues.password,
        email: enteredValues.email,
        id: Math.random(),
      }
      registerNewUser(newUser)
      resetStates()
      event?.target.reset()
      return console.log("Check passed")
    }
    return console.log("Check failed")
  }

  return (
    <div>
      <form onSubmit={submitButtonHandler}>
        <div>
          <label>User Name</label>
          <input
            required
            type="text"
            onChange={(event) => {
              inputChangeHandler("name", event?.target.value)
            }}
          ></input>
          {nameError && <p>{nameError}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            required
            type="email"
            onChange={(event) => {
              inputChangeHandler("email", event?.target.value)
            }}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            required
            type="password"
            onChange={(event) => {
              inputChangeHandler("password", event?.target.value)
            }}
          ></input>
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            required
            type="password"
            onChange={(event) => {
              inputChangeHandler("password2", event?.target.value)
            }}
          ></input>
          {passwordError && <p>{passwordError}</p>}
        </div>
        <div>
          <label>Year Born</label>
          <input
            required
            // type="number"
            // min="1900"
            onChange={(event) => {
              inputChangeHandler("year", event?.target.value)
            }}
          ></input>
          {!yearValid && (
            <p>
              Year must be number, have 4 digits and cannot be in the future
              year.
            </p>
          )}
        </div>
        <button
          type="submit"
          onClick={() => {
            console.log("submit is clicked")
          }}
        >
          submit
        </button>
        <button
          type="reset"
          onClick={() => {
            console.log("cancel is clicked", enteredValues)
          }}
        >
          cancel
        </button>
      </form>
    </div>
  )
}
