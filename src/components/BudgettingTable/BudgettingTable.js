import React, {Component, Fragment} from 'react'
import EditableCell from '../EditableCell/EditableCell'
import styled from 'styled-components'
import VerifyModal from '../Modal/VerifyModal'

const CenteredColumn = styled.td`
  text-align: center;
`
const Table = styled.table`
  width: 100%;
`
const ThAmount = styled.th`
  width: 130px;
`
const ThCategory = styled.th`
  width: 200px;
`
const ThRemove = styled.th`
  width: 50px;
`
const BudgetRow = styled.tr`
  transition: opacity 0.5s, visibility 0.5s;
  opacity: ${props => props.deleted ? '0' : '1'};
  visibility: ${props => props.deleted ? 'collapse' : 'visible'};
`

export default class BudgettingTable extends Component {

  state = {
    deletedCategory: null,
    verifyDeleteModalKey: null,
  }

  updateCategory = (category) => {
    return (newCategoryName) => {
      console.log(category)
      console.log('newCategoryName', newCategoryName)
    }
  }

  updateAmount = (category) => {
    return (amount) => {
      console.log(category)
      console.log('amount', amount)
    }
  }

  verifyDeleteRow = (category) => {
    return () => {
      this.setState({
        verifyDeleteModalKey: category,
      })
    }
  }

  deleteRow = (category) => {
    this.setState({
      deletedCategory: category,
      verifyDeleteModalKey: false,
    })
  }

  render() {
    const categoryBudgetToRemove = this.props.rows.find(budget => budget.category === this.state.verifyDeleteModalKey)
    return <Fragment>
      <Table className="table is-bordered">
        <thead>
        <tr>
          <ThCategory>
            Kategoria
          </ThCategory>
          <ThAmount>
            Määrä
          </ThAmount>
          <ThRemove className="centered">
            Poista
          </ThRemove>
        </tr>
        </thead>
        <tbody>
        {this.props.rows.map(budget => {
          return <BudgetRow key={`${budget.category}}`}>
            <EditableCell.Category onSubmit={this.updateCategory(budget.category)} value={budget.category} />
            <EditableCell.Amount onSubmit={this.updateAmount(budget.amount)} value={budget.amount} />
            <CenteredColumn>
              <a className="delete" onClick={this.verifyDeleteRow(budget.category)} />
            </CenteredColumn>
          </BudgetRow>
        })}
        </tbody>
      </Table>
      <VerifyModal
        title="Haluatko varmasti poistaa rivin?"
        show={!!this.state.verifyDeleteModalKey}
        label={categoryBudgetToRemove && `${categoryBudgetToRemove.category}, ${categoryBudgetToRemove.amount}`}
        delete={(category) =>{
          this.deleteRow(category)
        }}
        cancel={() => {this.setState({verifyDeleteModalKey: false})}}
      />
    </Fragment>
  }

}