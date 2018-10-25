import React, { Component } from 'react'
import styled from 'styled-components'
import capitalize from 'capitalize'

const Input = styled.input`
  margin-top: 0;
  margin-bottom: 0;
`

export default class CategoryInput extends Component {
  state = {
    value: '',
  }

  saveCategory = () => {
    this.props.saveCategory(this.props.item.id, this.state.value.toLowerCase())
  }

  updateValue = (event) => {
    this.setState({
      value: event.target.value,
    })
  }

  clearCategory = () => {
    this.props.saveCategory({
      id: this.props.item.id,
      category: '',
    })
  }

  render() {
    const {category} = this.props.item

    if (category) {
      return <div className="tags has-addons" style={{justifyContent: 'flex-end'}}>
        <span className="tag is-info">{capitalize(category)}</span>
        <a className="tag is-delete" onClick={this.clearCategory} />
      </div>
    }

    return <div className="field has-addons">
      <div className="control">
        <Input
          className="input is-small"
          type="text"
          placeholder="Kategoria"
          value={this.state.value}
          onChange={this.updateValue}
        />
      </div>
      <div className="control">
        <a className="button is-info is-small" onClick={this.saveCategory}>
          <span className="icon is-white">
            <i className="fas fa-save" />
          </span>
        </a>
      </div>
    </div>
  }
}