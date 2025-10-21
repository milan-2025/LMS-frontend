import { Grid, Typography } from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts"

const dataTransformer = (obj) => {
  let total = 0
  Object.keys(obj).forEach((key) => {
    total += obj[key]
  })
  let transformedDataArray = []
  Object.keys(obj).forEach((key) => {
    let transformedObj = {}

    switch (key) {
      case "0":
        transformedObj.name = "Sun"
        transformedObj.value = Math.ceil((obj[key] / total) * 100)
        transformedObj.actualValue = obj[key]
        transformedObj.dayIndex = Number(key)
        transformedDataArray.push(transformedObj)
        break
      case "1":
        transformedObj.name = "Mon"
        transformedObj.value = Math.ceil((obj[key] / total) * 100)
        transformedObj.actualValue = obj[key]
        transformedObj.dayIndex = Number(key)

        transformedDataArray.push(transformedObj)

        break
      case "2":
        transformedObj.name = "Tue"
        transformedObj.value = Math.ceil((obj[key] / total) * 100)
        transformedObj.actualValue = obj[key]
        transformedObj.dayIndex = Number(key)

        transformedDataArray.push(transformedObj)

        break
      case "3":
        transformedObj.name = "Wed"
        transformedObj.value = Math.ceil((obj[key] / total) * 100)
        transformedObj.actualValue = obj[key]
        transformedObj.dayIndex = Number(key)

        transformedDataArray.push(transformedObj)

        break
      case "4":
        transformedObj.name = "Thu"
        transformedObj.value = Math.ceil((obj[key] / total) * 100)
        transformedObj.actualValue = obj[key]
        transformedObj.dayIndex = Number(key)

        transformedDataArray.push(transformedObj)

        break
      case "5":
        transformedObj.name = "Fri"
        transformedObj.value = Math.ceil((obj[key] / total) * 100)
        transformedObj.actualValue = obj[key]
        transformedObj.dayIndex = Number(key)

        transformedDataArray.push(transformedObj)

        break
      case "6":
        transformedObj.name = "Sat"
        transformedObj.value = Math.ceil((obj[key] / total) * 100)
        transformedObj.actualValue = obj[key]
        transformedObj.dayIndex = Number(key)

        transformedDataArray.push(transformedObj)

        break
    }
  })
  console.log("transformed--", transformedDataArray)
  return transformedDataArray
}

const ReportCard = ({ obj, title, today }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    const isVisible = active && payload && payload.length
    if (isVisible) {
      console.log("payload--", payload)
      console.log(
        "calc--",
        today == payload[0].payload.dayIndex ? "Today" : payload[0].payload.name
      )
    }
    return (
      <div
        className="custom-tooltip"
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <>
            <p className="label">{`${
              today == payload[0].payload.dayIndex
                ? "Today"
                : payload[0].payload.name
            } : ${payload[0].payload.actualValue}`}</p>
            {/* <p className="intro">{getIntroOfPage(label)}</p>
          <p className="desc">Anything you want can be displayed here.</p> */}
          </>
        )}
      </div>
    )
  }
  let trd = dataTransformer(obj)
  return (
    <>
      <Grid
        size={{
          xs: 12,
          md: 6,
        }}
        bgcolor={"secondary.main"}
        borderRadius={"1.3rem"}
        padding={"1.3rem"}
      >
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h5">{obj[today]}</Typography>
        <Typography variant="caption">Today</Typography>
        <Grid size={12}>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={trd}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              // Set the bar category gap to control spacing
              barCategoryGap="10%"
              // Set bar size to control the width of the bars
              barSize={20}
            >
              {/* XAxis for the day labels */}
              <XAxis
                dataKey="name"
                axisLine={false} // Hide the main X-axis line
                tickLine={false} // Hide the small tick marks
                style={{ fontSize: "12px" }}
              />
              <Tooltip content={CustomTooltip} />

              {/* Bar component to display the data */}
              <Bar
                dataKey="value"
                // The key to apply the custom color logic
                // fill={LIGHT_BLUE}
              >
                {trd.map((entry, index) => {
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={today == index ? "#22C55E" : "#4ADE80"}
                    />
                  )
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </>
  )
}

export default ReportCard
