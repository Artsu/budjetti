import React, {Component} from 'react'
import classnames from 'classnames'

export default class Input extends Component {
  static defaultProps = {
    validate: () => false,
    onChange: () => {},
    submitError: false,
    isSmall: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      error: false,
      value: this.props.value || '',
    }
  }

  isValid = () => {
    return !!this.state.value && !this.state.error
  }

  hasError = () => {
    return this.state.error || this.props.submitError
  }

  updateInput = async (event) => {
    const { value } = event.target
    const error = this.props.validate(value)

    await this.setState({
      value,
      error,
    })

    this.props.onChange()
  }

  getValue = () => {
    return this.state.value
  }

  clear = () => {
    this.setState({
      error: false,
      value: '',
    })
  }

  render () {
    return <div className={classnames('control has-icons-right', this.props.className)}>
      <input
        className={classnames('input', {
          'is-small': this.props.isSmall,
          'is-danger': this.hasError(),
          'is-success': this.isValid()
        })}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.updateInput}
      />

      {
        this.isValid() &&
        <span className="icon is-right">
          <i className="fas fa-check" />
        </span>
      }

      {
        this.hasError() &&
        <span className="icon is-right is-danger">
          <i className="fas fa-times" />
        </span>
      }

    </div>
  }
}