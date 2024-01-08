import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetPaymentsQuery } from "state/api";
import { Box, CircularProgress } from "@mui/material";

const LineChart = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetPaymentsQuery({ pageSize: 100 });

  if (isLoading)
    return (
      <Box
        sx={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress>
          <p>Loading...</p>
        </CircularProgress>
      </Box>
    );

  function groupByMonth(payments) {
    const groupedPayments = {};

    payments.forEach((payment) => {
      const date = new Date(payment.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const key = `${year}-${month}`;

      if (!groupedPayments[key]) {
        groupedPayments[key] = {
          year,
          month,
          total: 0,
        };
      }

      groupedPayments[key].total += payment.amount;
    });

    return Object.values(groupedPayments).sort(
      (a, b) => new Date(a.year, a.month) - new Date(b.year, b.month)
    );
  }

  const groupedPayments = groupByMonth(data.payments);

  const formattedData = [
    {
      id: "Income",
      data: groupedPayments.map((payment) => ({
        x: `${payment.year}-${payment.month}`,
        y: payment.total,
      })),
    },
  ];

  return (
    <ResponsiveLine
      data={formattedData}
      colors={
        theme.palette.mode === "dark"
          ? theme.palette.secondary[400]
          : theme.palette.secondary[500]
      }
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.primary[300],
              opacity: 0.8,
            },
          },
          legend: {
            text: {
              fill: theme.palette.primary[100],
              opacity: 0.8,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.primary[100],
              strokeWidth: 1,
              opacity: 0.8,
            },
            text: {
              fill: theme.palette.primary[100],
              opacity: 0.8,
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
            color: theme.palette.primary[600],
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "0",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=">-$.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (value) => {
          const [year, month] = value.split("-");
          const twoDigitYear = year.slice(-2);
          return `${month}/${twoDigitYear}`;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Month",
        legendOffset: 42,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickValues: [0, 1000, 2000, 3000, 4000, 5000],
        legend: "Amount",
        legendOffset: -55,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={true}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      enableArea={true}
      areaOpacity={0.3}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 70,
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
