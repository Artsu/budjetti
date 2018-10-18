import React, { Component } from 'react'
import styled from 'styled-components'
import { parseOPCopyPaste } from './bankCPParseTool'

const RowsInputWrapper = styled.div`
  margin-bottom: 10px;
`

const TextArea = styled.textarea`
  margin-bottom: 10px;
`

export default class RowsInput extends Component {
  state = {
    value: '',
  }

  handleOnInputChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleSend = () => {
    const entries = parseOPCopyPaste(this.state.value)
    console.log('entries', entries)
    this.props.addEntries(entries)
  }

  render() {
    return <RowsInputWrapper>
      <TextArea className="textarea" onChange={this.handleOnInputChange} placeholder="Liitä rivejä tiliotteesta tähän" />
      <button className="button" onClick={this.handleSend}>Lisää</button>
    </RowsInputWrapper>
  }
}
