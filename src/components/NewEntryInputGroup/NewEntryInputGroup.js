import React, {Component} from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import Input from '../Input/Input'
import {dateInputValidator, getDateFormat} from '../../common/validators/dateValidator'
import {amountInputValidator} from '../../common/validators/amountValidator'

const AddNewRowLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`

const NewEntryInputGroupContainer = styled.div`
  margin: 15px 0;
`

const DateInput = styled.input`
  width: 140px;
`

const TransceiverInput = styled.input`
`

const AmountInput = styled.input`
  width: 160px;
`

const CategoryInput = styled.input`
  width: 160px;
`

export default class NewEntryInputGroup extends Component {
  state = {
    isValid: false,
  }

  addEntry = async () => {
    const dateValue = this.date.getValue()
    const format = getDateFormat(dateValue)
    const entry = {
      date: DateTime.fromFormat(dateValue, format).toJSDate(),
      transceiver: this.transceiver.getValue(),
      amount: parseFloat(this.amount.getValue()),
      category: this.category.getValue(),
    }
    this.props.addEntry(entry)

    this.date.clear()
    this.transceiver.clear()
    this.amount.clear()
    this.category.clear()
  }

  onInputChange = () => {
    this.setState({
      isValid: this.date && this.date.isValid() &&
        this.transceiver && this.transceiver.isValid() &&
        this.amount && this.amount.isValid()
    })
  }

  render() {
    return <NewEntryInputGroupContainer>
      <AddNewRowLabel>Lisää uusi rivi:</AddNewRowLabel>
      <div className="columns">
        <div className="column is-narrow">
          <DateInput
            placeholder="Päivämäärä *"
            as={Input}
            validate={dateInputValidator}
            ref={dateInput => this.date = dateInput}
            onChange={this.onInputChange}
          />
        </div>

        <div className="column">
          <TransceiverInput
            as={Input}
            placeholder="Saaja / lähettäjä *"
            ref={transceiverInput => this.transceiver = transceiverInput}
            onChange={this.onInputChange}
          />
        </div>

        <div className="column is-narrow">
          <AmountInput
            as={Input}
            placeholder="Määrä *"
            validate={amountInputValidator}
            ref={amountInput => this.amount = amountInput}
            onChange={this.onInputChange}
          />
        </div>

        <div className="column is-narrow">
          <CategoryInput
            as={Input}
            placeholder="Kategoria"
            ref={categoryInput => this.category = categoryInput}
          />
        </div>

        <div className="column is-narrow">
          <p className="is-inline-flex">
            <button className="button is-link" onClick={this.addEntry} disabled={!this.state.isValid}>
              <span>Tallenna</span>
              <span className="icon is-small">
                <i className="fas fa-save" />
              </span>
            </button>
          </p>
        </div>
      </div>
    </NewEntryInputGroupContainer>
  }
}