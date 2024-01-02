import * as stylex from "@stylexjs/stylex"
import { motion } from "framer-motion"

type AnswerProps = {
  answer: string
  index: number
  voteFn: (index: number) => void
}

export const Answer = ({ answer, voteFn, index }: AnswerProps) => {
  return (
    <motion.div
      {...stylex.props(answerStyles.base)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        duration: 0.01,
        type: "spring",
        damping: 10,
        stiffness: 100,
      }}
      onClick={() => {
        voteFn(index)
      }}
      key={index}
    >
      {answer}
    </motion.div>
  )
}

const answerStyles = stylex.create({
  base: {
    backgroundColor: "pink",
    // margin: "1rem",
    marginBottom: "1rem",
    border: "3px solid black",
    borderRadius: ".5em",
    padding: ".4rem",
    // width: "max-width",
    width: "100%",
    cursor: "pointer",
  },
})
