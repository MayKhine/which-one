import * as stylex from "@stylexjs/stylex"

type BarChartProps = {
  voting: Array<Array<string>>
  userVote: number //the index that userVoted
}
export const BarChart = ({ voting, userVote }: BarChartProps) => {
  console.log("IN THE BARCHAR: ", voting, userVote)

  let voteTotal = 0
  voting.map((voteOption) => {
    voteTotal = voteTotal + voteOption.length
  })

  console.log("vote total: ", voteTotal)

  return (
    <div {...stylex.props(barChartStyles.base)}>
      {userVote}
      {voting.map((barData, index) => {
        const optionLabel = `Option ${index + 1}`
        const votePct = (barData.length / voteTotal) * 100
        console.log("vote pct: ", votePct)
        return (
          <div {...stylex.props(barChartStyles.option)} key={index}>
            <div {...stylex.props(barChartStyles.label)}> {optionLabel}</div>
            <div {...stylex.props(barChartStyles.bar)}>
              <div {...stylex.props(barChartStyles.dynamicBar(votePct))}></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const barChartStyles = stylex.create({
  base: { backgroundColor: "lightgray", width: "100%" },
  option: { backgroundColor: "pink", display: "flex", flexGrow: "2" },
  label: { width: "7rem", backgroundColor: "lightgray" },
  bar: { backgroundColor: "lightyellow", display: "flex", width: "60rem" },
  dynamicBar: (votePct) => ({
    // width: votePct,
    // width: "calc(100% - 50%)",
    width: `${votePct}%`,
    border: "3px solid black",
    borderRadius: "0.5rem",
    height: "2rem",
    backgroundColor: "lightgreen",
  }),
})
