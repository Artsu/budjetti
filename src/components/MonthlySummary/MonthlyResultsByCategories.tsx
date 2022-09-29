import React, { FC, useMemo } from "react";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import compose from "lodash/fp/flowRight";
import filter from "lodash/fp/filter";
import map from "lodash/fp/map";
import orderBy from "lodash/fp/orderBy";
import capitalize from "capitalize";
import { Entry } from "../../common/types";

Chart.register(CategoryScale, LinearScale, BarElement);

interface MonthlyResultsByCategoriesProps {
  entries: Entry[];
}

const MonthlyDashboardGraphsContainer = styled.div<{ rowCount: number }>`
  position: relative;
  height: ${(props) => props.rowCount * 50}px;
  min-height: 100px;
  width: 50%;
  margin-bottom: 45px;
`;

const calculateCategoryTotals = (entries: Entry[]): any[] => {
  const monthlyCategoryResults: { [category: string]: number } = {};
  entries.forEach((entry) => {
    const category = entry.category || "muu";
    if (monthlyCategoryResults[category]) {
      monthlyCategoryResults[category] += entry.amount;
    } else {
      monthlyCategoryResults[category] = entry.amount;
    }
  });
  const categories = Object.keys(monthlyCategoryResults);
  return compose(
    orderBy(
      (categoryAmount: { amount: string }) => parseFloat(categoryAmount.amount),
      ["desc"],
    ),
    filter((c) => c),
    map((category: string) => {
      const amount = monthlyCategoryResults[category];
      if (amount < 0) {
        return {
          category: capitalize(category),
          amount: Math.abs(amount).toFixed(2),
        };
      }
    }),
  )(categories);
};

const MonthlyResultsByCategories: FC<MonthlyResultsByCategoriesProps> = ({
  entries,
}) => {
  const expensesCategoryTotals = useMemo<any[]>(
    () => calculateCategoryTotals(entries),
    [entries],
  );

  return (
    <MonthlyDashboardGraphsContainer rowCount={expensesCategoryTotals.length}>
      <h2 className="subtitle">Kuukauden menot kategorioittain</h2>
      <Bar
        data={{
          labels: expensesCategoryTotals.map((c) => c.category),
          datasets: [
            {
              barThickness: 20,
              label: "Yhteensä",
              data: expensesCategoryTotals.map((c) => c.amount),
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          indexAxis: "y",
          scales: {
            y: {
              ticks: {
                font: {
                  size: 16,
                },
              },
              stacked: true,
            },
            x: {
              beginAtZero: true,
            },
          },
          // legend: {
          //   display: false,
          // },
          maintainAspectRatio: false,
          // tooltips: {
          //   labels: {
          //     fontSize: 20,
          //   },
          // },
        }}
      />
    </MonthlyDashboardGraphsContainer>
  );
};

export default MonthlyResultsByCategories;
