import React, {Component, Fragment} from 'react'
import EditableCell from '../EditableCell/EditableCell'
import styled from 'styled-components'
import DateTime from 'luxon/src/datetime'
import ReactDOM from 'react-dom'

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

const RemoveRowVerifyModal = (props) => {
  const { itemToRemove = {}} = props
  const dateTime = itemToRemove.date && DateTime.fromJSDate(itemToRemove.date).toLocal()
  const label = `${dateTime && dateTime.toLocaleString()} | ${itemToRemove.transceiver} | ${itemToRemove.amount && itemToRemove.amount.toFixed(2)}€`

  return ReactDOM.createPortal(
    <div className={'modal ' + (props.show && 'is-active')}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Haluatko varmasti poistaa rivin?</p>
        </header>

        <section className="modal-card-body">
          {label}
        </section>

        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={() => props.delete(props.itemToRemove.id)}>Poista</button>
          <button className="button" onClick={props.cancel}>Peruuta</button>
        </footer>
      </div>
    </div>,
    window.document.querySelector('body')
  )
}

export default class BudgettingTable extends Component {

  state = {
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

  deleteRow = (category) => {
    return () => {}
  }

  render() {
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
              <a className="delete" onClick={this.deleteRow(budget.category)} />
            </CenteredColumn>
          </BudgetRow>
        })}
        </tbody>
      </Table>
      <RemoveRowVerifyModal
        show={!!this.state.verifyDeleteModalKey}
        itemToRemove={this.props.rows.find(budget => budget.category === this.state.verifyDeleteModalKey)}
        delete={(id) =>{
          this.props.deleteEntry(id)
          this.setState({
            deletedId: id,
            verifyDeleteModalKey: false,
          })
        }}
        cancel={() => {this.setState({verifyDeleteModalKey: false})}}
      />
    </Fragment>
  }

}