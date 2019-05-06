import React, {Component} from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import isEmpty from 'lodash/isEmpty'
import {dateInputValidator} from '../../common/validators/dateValidator'
import {amountInputValidator} from '../../common/validators/amountValidator'
import Input from '../Input/Input'
import ColoredAmount from '../ColoredAmount/ColoredAmount'

class EditableCell extends Component {
  static defaultProps = {
    onSubmit: () => {},
    textAlign: 'left',
  }

  static propTypes = {
    onClick: PropTypes.func,
  }

  state = {
    editingOn: false,
    isValid: false,
  }

  cancelEdit = () => {
    this.setState({editingOn: false})
  }

  startEdit = () => {
    this.setState({editingOn: true})
  }

  save = (event) => {
    event.stopPropagation()
    this.cancelEdit()
    this.props.onSubmit(this.input.getValue())
  }

  checkValidity = () => {
    this.setState({isValid: this.input.isValid()})
  }

  render() {
    const displayValue = this.props.isAmount
      ? <ColoredAmount value={this.props.value}/>
      : <span>{this.props.value}</span>
    const editValue = <div className="field has-addons">
      <div className="control">
        <Input
          isSmall
          placeholder={this.props.placeholder}
          validate={this.props.validate}
          value={this.props.value}
          onChange={this.checkValidity}
          ref={(input) => this.input = input}
        />
      </div>
      <div className="control">
        <button className="button is-info is-small" onClick={this.save} disabled={!this.state.isValid}>
          <span className="icon is-white">
            <i className="fas fa-save" />
          </span>
        </button>
      </div>
    </div>

    return <td style={{textAlign: this.props.textAlign}} onClick={this.startEdit}>
      <OutsideClickHandler onOutsideClick={this.cancelEdit}>
        { this.state.editingOn ? editValue : displayValue }
      </OutsideClickHandler>
    </td>
  }
}

export default {
  Date: (props) => {
    return <EditableCell
      {...props}
      placeholder="Päivämäärä"
      validate={dateInputValidator}
      textAlign="center"
    />
  },
  Transceiver: (props) => {
    return <EditableCell
      {...props}
      placeholder="Saaja / lähettäjä"
      validate={(value) => !isEmpty(value)}
      textAlign="right"
    />
  },
  Amount: (props) => {
    return <EditableCell
      {...props}
      placeholder="Määrä"
      validate={amountInputValidator}
      isAmount
      textAlign="right"
    />
  },
  Category: (props) => {
    return <EditableCell
      {...props}
      placeholder="Kategoria"
      validate={(value) => !isEmpty(value)}
    />
  },
}