import React, {Component} from 'react'
import Chart from 'chart.js'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'

const MonthlyDashboardGraphsContainer = styled.div`
  position: relative;
  height: ${props => props.rowCount * 50}px;
  min-height: 100px;
`

export default class MonthlyResultsByCategories extends Component {

  constructor(props) {
    super(props)

    this.container = React.createRef()
    this.state = {
      categoryTotalsCount: 1,
    }
  }


  calculateCategoryTotals = (entries) => {
    const monthlyCategoryResults = {}
    entries.forEach(entry => {
      const category = entry.category || 'muu'
      if (monthlyCategoryResults[category]) {
        monthlyCategoryResults[category] += Math.abs(entry.amount)
      } else {
        monthlyCategoryResults[category] = Math.abs(entry.amount)
      }
    })
    const categories = Object.keys(monthlyCategoryResults)
    const unorderedCategoryAmountMap = categories.map(category => ({category, amount: monthlyCategoryResults[category]}))
    return orderBy(unorderedCategoryAmountMap, categoryAmount => categoryAmount.amount, ['desc'])
  }

  async componentDidMount() {
    this.chart = new Chart(this.container.current, {
      type: 'horizontalBar',
      data: {
        labels: [],
        datasets: [{
          label: 'Yhteensä',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              fontSize: 16,
            },
            barThickness: 20,
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }]
        },
        legend: {
          display: false,
        },
        maintainAspectRatio: false,
        tooltips: {
          labels: {
            fontSize: 20,
          },
        }
      },
    })
  }

  async componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.entries) !== JSON.stringify(this.props.entries)) {
      const expensesCategoryTotals = this.calculateCategoryTotals(nextProps.entries.filter(entry => entry.amount < 0))
      await this.setState({categoryTotalsCount: expensesCategoryTotals.length})
      this.chart.data.labels = expensesCategoryTotals.map(c => c.category)
      this.chart.data.datasets[0].data = expensesCategoryTotals.map(c => c.amount)
      this.chart.update()
    }
  }

  render() {
    return <MonthlyDashboardGraphsContainer rowCount={this.state.categoryTotalsCount}>
      <canvas ref={this.container} />
    </MonthlyDashboardGraphsContainer>
  }
}