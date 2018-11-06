import React, {Component} from 'react'
import styled from 'styled-components'
import {Doughnut} from 'react-chartjs-2'

const ChartContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`

const DoughnutChart = (props) => <Doughnut
  data={{
    datasets: [{
      data: props.values,
      backgroundColor: props.colors,
      borderColor: '#bcbcbc',
      borderWidth: 1,
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs

    labels: props.labels,
  }}
  options={{
    responsive: false,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: props.title,
      lineHeight: 0.5,
    }
  }}
  height={130}
  width={150}
/>

export default class MonthlyDashboardGraphs extends Component {
  render() {
    const total = this.props.income + this.props.expenses
    return <ChartContainer>
      <DoughnutChart
        values={[this.props.expenses.toFixed(2), -2000]}
        colors={[
          '#fc657b',
        ]}
        labels={[
          'Menot',
          'Arvioidut menot',
        ]}
        title="Menot / arvio"
      />
      <DoughnutChart
        values={[this.props.income.toFixed(2), 2000]}
        colors={[
          '#2de5a6',
        ]}
        labels={[
          'Tulot',
          'Arvioidut tulot',
        ]}
        title="Tulot / arvio"
      />
      <DoughnutChart
        values={[this.props.income.toFixed(2), total.toFixed(2), this.props.expenses.toFixed(2)]}
        colors={[
          '#2de5a6',
          total > 0 ? '#1a845f' : '#c4505f',
          '#fc657b',
        ]}
        labels={[
          'Tulot',
          'Tulos',
          'Menot',
        ]}
        title="Yhteensä"
      />
    </ChartContainer>
  }
}