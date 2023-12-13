import { useState } from "react"
import * as stylex from "@stylexjs/stylex"

import { Button } from "../../UI/Button"
import { InputDiv } from "../../UI/InputDiv"
import { textStyles } from "../../styleX/textStyles"
import { buttonStyles } from "../../styleX/buttonStyles"
type PostFormProps = {
  onFormSubmit: (val: enteredValuesType) => boolean
}

export type enteredValuesType = {
  question: string
  answers: Array<string>
}

const postFormStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "pink",
    width: "60vw",
    margin: "1.5rem",
    marginLeft: "3rem",
  },

  buttonsDiv: {
    // marginRight: "-.8rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: "1rem",
  },

  inputDiv: {
    display: "flex",
    width: "100%",
    flexGrow: "1",
    height: "3rem",
    marginBottom: ".5rem",
  },
})

export const PostForm = ({ onFormSubmit }: PostFormProps) => {
  const [enteredValues, setEnteredValues] = useState({
    question: "",
    answers: ["", ""],
  })
  const [answerArr, setAnswerArr] = useState(["", ""])

  const [createPost, setCreatePost] = useState(false)

  const cancelPostHandler = () => {
    setCreatePost(!createPost)
    setEnteredValues({
      question: "",
      answers: ["", ""],
    })
    setAnswerArr(["", ""])
  }

  const inputChangeHandler = (
    identifier: string,
    value: string,
    ansIndex: number
  ) => {
    if (identifier == "answers") {
      const curAnsArr = enteredValues.answers

      //if ans arrr ald exist and go to its index
      if (curAnsArr?.length > 0 && ansIndex) {
        const curAnsArrUpdated = [...curAnsArr]
        curAnsArrUpdated[ansIndex] = value

        setEnteredValues((preVal) => ({
          ...preVal,
          answers: [...curAnsArrUpdated],
        }))
      } else {
        setEnteredValues((prevVal) => ({
          ...prevVal,
          answers: [value],
        }))
      }
    } else {
      setEnteredValues((preVal) => ({
        ...preVal,
        [identifier]: value,
      }))
    }
  }

  const checkAnswerArry = () => {
    const ansArryLength = enteredValues.answers.length
    if (ansArryLength < 2) {
      return false
    }
    for (let i = 0; i < ansArryLength; i++) {
      for (let y = 1; y < ansArryLength; y++) {
        const ansA = enteredValues.answers[i]
        const ansB = enteredValues.answers[y]

        if (i == y) {
          break
        }
        if (ansA.toLowerCase() == ansB.toLowerCase()) {
          return false
        }
      }
    }
    return true
  }

  const formSubmitHandler = async (event: any) => {
    event.preventDefault()
    console.log("IN THE FORM SUBMIT HANDLER", enteredValues)

    if (checkAnswerArry()) {
      const postSuccess = await onFormSubmit(enteredValues)

      console.log("WAS SUBMIT SUCCESS: ", postSuccess)
      if (!postSuccess) {
        console.log("SHOW POST ERROR")
      } else {
        console.log("CLEAR THE FORM ")
        event?.target.reset()
        cancelPostHandler()
      }
    }
  }
  return (
    <form onSubmit={formSubmitHandler} {...stylex.props(postFormStyles.base)}>
      <div>
        <div>What's your question?</div>
        <div {...stylex.props(postFormStyles.inputDiv)}>
          <input
            {...stylex.props(textStyles.input, textStyles.inputQuesion)}
            required
            type="text"
            value={enteredValues.question}
            onSelect={() => {
              if (!createPost) {
                setCreatePost(!createPost)
              }
            }}
            onChange={(event) => {
              inputChangeHandler("question", event?.target.value, 121)
            }}
          ></input>
        </div>
      </div>

      {createPost && (
        <div>
          <div>
            {answerArr.map((answer, index) => {
              const label = "Option " + (index + 1).toString()
              return (
                <>
                  <div>{label}</div>
                  <div {...stylex.props(postFormStyles.inputDiv)}>
                    {/* <InputDiv
                      key={index}
                      index={index}
                      identifier="answers"
                      onChangeFn={inputChangeHandler}
                      type="text"
                    /> */}
                    <input
                      required
                      {...stylex.props(
                        textStyles.input,
                        textStyles.inputQuesion
                      )}
                      type="text"
                      onChange={(event) => {
                        inputChangeHandler("answers", event.target.value, index)
                      }}
                    ></input>
                    <button
                      {...stylex.props(buttonStyles.base, buttonStyles.attach)}
                      onClick={() => {
                        console.log("NEED TO WORK ON THIS")
                      }}
                    >
                      A
                    </button>
                  </div>
                </>
              )
            })}
          </div>
          <div {...stylex.props(postFormStyles.buttonsDiv)}>
            <div>
              <button
                {...stylex.props(buttonStyles.base, buttonStyles.addAnswer)}
                onClick={() => {
                  setAnswerArr((prevVal) => [...prevVal, ""])
                }}
              >
                +
              </button>
            </div>
            <div>
              <Button text="Cancel" onClickFn={cancelPostHandler} />
              <Button
                text="Create"
                onClickFn={() => {
                  console.log("Submit Button is clciked")
                  // formSubmitHandler()
                }}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  )
}
