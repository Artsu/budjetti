import React, {Component} from 'react'
import Chart from 'chart.js'
import styled from 'styled-components'
import compose from 'lodash/fp/flowRight'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'
import orderBy from 'lodash/fp/orderBy'
import capitalize from 'capitalize'

const MonthlyDashboardGraphsContainer = styled.div`
  position: relative;
  height: ${props => props.rowCount * 50}px;
  min-height: 100px;
  width: 50%;
  margin-bottom: 45px;
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
        monthlyCategoryResults[category] += entry.amount
      } else {
        monthlyCategoryResults[category] = entry.amount
      }
    })
    const categories = Object.keys(monthlyCategoryResults)
    return compose(
      orderBy(categoryAmount => parseFloat(categoryAmount.amount), ['desc']),
      filter(c => c),
      map(category => {
        const amount = monthlyCategoryResults[category]
        if (amount < 0) {
          return {
            category: capitalize(category),
            amount: Math.abs(amount).toFixed(2),
          }
        }
      }),
    )(categories)
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
            stacked: true,
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
      const expensesCategoryTotals = this.calculateCategoryTotals(nextProps.entries)
      console.log('expensesCategoryTotals', expensesCategoryTotals)
      await this.setState({categoryTotalsCount: expensesCategoryTotals.length})
      this.chart.data.labels = expensesCategoryTotals.map(c => c.category)
      this.chart.data.datasets[0].data = expensesCategoryTotals.map(c => c.amount)
      this.chart.update()
    }
  }

  render() {
    return <MonthlyDashboardGraphsContainer rowCount={this.state.categoryTotalsCount}>
      <h2 className="subtitle">Kuukauden menot kategorioittain</h2>
      <canvas ref={this.container} />
    </MonthlyDashboardGraphsContainer>
  }
}