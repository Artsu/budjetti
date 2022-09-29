import React, { Component, FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

interface DoughnutChartProps {
  labels: any;
  title: string;
  values: string[];
  colors: string[];
}

const ChartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const DoughnutChart: FC<DoughnutChartProps> = (props) => (
  <Doughnut
    data={{
      datasets: [
        {
          data: props.values,
          backgroundColor: props.colors,
          borderColor: "#bcbcbc",
          borderWidth: 1,
        },
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs

      labels: props.labels,
    }}
    options={{
      responsive: false,
      maintainAspectRatio: false,
      // legend: {
      //   display: false,
      // },
      plugins: {
        title: {
          display: true,
          text: props.title,
          font: {
            lineHeight: 0.5,
          },
        },
      },
    }}
    height={130}
    width={150}
  />
);

interface MonthlyDashboardGraphsProps {
  expenses: number;
  income: number;
  expensesBudget: number;
  incomeBudget: number;
}

const MonthlyDashboardGraphs: FC<MonthlyDashboardGraphsProps> = ({
  income,
  expenses,
  expensesBudget,
  incomeBudget,
}) => {
  const total = income + expenses;
  return (
    <ChartContainer>
      <DoughnutChart
        values={[expenses.toFixed(2), expensesBudget.toFixed(2)]}
        colors={["#fc657b", "#2de5a6"]}
        labels={["Menot", "Arvioidut menot"]}
        title="Menot / arvio"
      />
      <DoughnutChart
        values={[income.toFixed(2), incomeBudget.toFixed(2)]}
        colors={["#2de5a6", "#fc657b"]}
        labels={["Tulot", "Arvioidut tulot"]}
        title="Tulot / arvio"
      />
      <DoughnutChart
        values={[income.toFixed(2), total.toFixed(2), expenses.toFixed(2)]}
        colors={["#2de5a6", total > 0 ? "#1a845f" : "#c4505f", "#fc657b"]}
        labels={["Tulot", "Tulos", "Menot"]}
        title="Yhteensä"
      />
    </ChartContainer>
  );
};

export default MonthlyDashboardGraphs;
