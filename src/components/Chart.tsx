"use client"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple area chart"

const chartConfig = {
  totalDelegation: {
    label: "totalDelegation",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ComponentChart({ chartData }: { chartData: any }) {

  // Réverser les données pour afficher de la plus récente à la plus ancienne
  const reversedData = [...chartData].reverse();

  // Vérifier les ticks et les données dans la console pour le débogage
  console.log("Reversed Data:", reversedData);

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={reversedData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          allowDecimals={false}
          domain={[
            (dataMin) => Math.floor(dataMin / 100) * 75,
            (dataMax) => Math.ceil(dataMax / 100) * 125,
          ]}
          tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
          scale="linear"
          nice 
        />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={Math.floor(chartData.length / 5)} // Dynamically space out ticks
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString('fr-FR', {
              month: 'short', // Abbreviated month (e.g., Jan)
              day: 'numeric', // Day of the month
            });
          }}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="totalDelegation"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
