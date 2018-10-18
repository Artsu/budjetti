import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import ColoredAmount from '../ColoredAmount/ColoredAmount'
import CategoryInput from '../CategoryInput/CategoryInputContainer'

import './ExpensesTable.css'

const CenteredColumn = styled.td`
  text-align: center;
`

const Table = styled.table`
  width: 100%;
`

const TdAlignCenter = styled.td`
  text-align: center;
`

const TdAlignRight = styled.td`
  text-align: right;
`

const ThCategory = styled.th`
  width: 150px;
`

const EntryRow = styled.tr`
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

export default class ExpensesTable extends Component {
  static defaultProps = {
    entries: []
  }

  state = {
    verifyDeleteModalKey: false,
    deletedId: null,
  }

  deleteRow = (key) => {
    return () => {
      this.setState({
        verifyDeleteModalKey: key,
      })
    }
  }

  render() {
    return <Fragment>
      <Table className="table is-striped is-bordered is-hoverable">
        <thead>
          <tr>
            <th>
              Pvm
            </th>
            <th>
              Saaja
            </th>
            <th>
              Määrä
            </th>
            <ThCategory>
              Kategoria
            </ThCategory>
            <th>
              Tili
            </th>
            <th className="centered">
              Poista
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.entries.map(item => {
            const dateTime = DateTime.fromJSDate(item.date).toLocal()
            return <EntryRow key={`${item.id}-${item.transceiver}-${dateTime.toISO()}`} deleted={this.state.deletedId === item.id}>
              <td>
                {dateTime.toLocaleString()}
              </td>
              <td>
                {item.transceiver}
              </td>
              <td>
                {
                  <ColoredAmount value={item.amount} />
                }
              </td>
              <TdAlignRight>
                <CategoryInput item={item} />
              </TdAlignRight>
              <TdAlignCenter>
                {item.account}
                OP
              </TdAlignCenter>
              <CenteredColumn>
                <a className="delete" onClick={this.deleteRow(item.id)} />
              </CenteredColumn>
            </EntryRow>
          })}
        </tbody>
      </Table>
      <RemoveRowVerifyModal
        show={!!this.state.verifyDeleteModalKey}
        itemToRemove={this.props.entries.find(entry => entry.id === this.state.verifyDeleteModalKey)}
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