import React, {Component} from 'react'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import Input from '../Input/Input'
import {amountInputValidator} from '../../common/validators/amountValidator'

const AddNewRowLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`

const NewCategoryBudgetInputGroupContainer = styled.div`
  margin: 15px 0;
`

const AmountInput = styled.input`
  width: 160px;
`

const CategoryInput = styled.input`
  width: 160px;
`

export default class NewCategoryBudgetInputGroup extends Component {
  state = {
    isValid: false,
  }

  addCategoryBudget = () => {
    const categoryBudget = {
      category: this.category.getValue(),
      amount: parseFloat(this.amount.getValue()),
    }
    this.props.addOrUpdateBudgetForCategory(this.props.budgetKey, categoryBudget)

    this.category.clear()
    this.amount.clear()
  }

  onInputChange = () => {
    this.setState({
      isValid: this.category && this.category.isValid() &&
        this.amount && this.amount.isValid()
    })
  }

  render() {
    return <NewCategoryBudgetInputGroupContainer>
      <AddNewRowLabel>{this.props.title}:</AddNewRowLabel>
      <div className="columns">
        <div className="column is-narrow">
          <CategoryInput
            as={Input}
            placeholder="Kategoria"
            validate={(value) => !isEmpty(value)}
            ref={categoryInput => this.category = categoryInput}
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
          <p className="is-inline-flex">
            <button className="button is-link" onClick={this.addCategoryBudget} disabled={!this.state.isValid}>
              <span>Tallenna</span>
              <span className="icon is-small">
                <i className="fas fa-save" />
              </span>
            </button>
          </p>
        </div>
      </div>
    </NewCategoryBudgetInputGroupContainer>
  }
}