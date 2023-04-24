import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetPaymentsQuery } from "state/api";

const LineChart = () => {
  const theme = useTheme();
  const { data } = useGetPaymentsQuery({});

  //const formattedData = payments.map((payment) => ({
  //  x: payment.createdAt, // use the payment creation date as the x-axis value
  //  y: payment.amount, // use the payment amount as the y-axis value
  //}));

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.primary[100],
            },
          },
          legend: {
            text: {
              fill: theme.palette.primary[100],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.primary[100],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.primary[100],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.primary[100],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary[500],
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
