import React, { Component } from 'react'
import styled from 'styled-components'
import Promise from 'bluebird'
import classnames from 'classnames'
import { parseOPCopyPaste, parseNordeaCopyPaste } from './bankCPParseTool'

import OPLogo from '../../assets/op-logo.png'
import NordeaLogo from '../../assets/nordea-logo.png'

const RowsInputWrapper = styled.div`
`
const AddRowsToggleButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`

const LogoButton = styled.a`
  margin: 0 5px;
`

const LogoButtonImage = styled.img`
  height: 30px;
`

const TextArea = styled.textarea`
  margin-bottom: 10px;
`

const TextAreaToggle = styled.div`
  transition: max-height 0.5s ease-in-out;
  max-height: ${props => props.isOpen ? '400' : '0'}px;
  overflow: hidden;
`

export default class RowsInput extends Component {
  state = {
    value: '',
    openedTextArea: null,
  }

  handleOnInputChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleSend = () => {
    const entries = []
    switch (this.state.openedTextArea) {
      case 'op':
        entries.push(...parseOPCopyPaste(this.state.value))
        break
      case 'nordea':
        entries.push(...parseNordeaCopyPaste(this.state.value))
        break
    }

    this.props.addEntries(entries)
    this.setState({value: '', openedTextArea: null})
    // TODO: Show notification for how many rows were added
  }

  toggleTextArea = (account) => {
    return async () => {
      if (this.state.openedTextArea) {
        const openState = this.state.openedTextArea
        await this.setState({openedTextArea: null})
        if (openState === account) {
          return
        }

        await Promise.delay(500)
      }

      await this.setState({openedTextArea: account})
    }
  }

  render() {
    return <RowsInputWrapper>
      <AddRowsToggleButtons>
        Lisää rivejä:
        <LogoButton
          className={classnames('button', {'is-active': this.state.openedTextArea === 'op'})}
          onClick={this.toggleTextArea('op')}
        >
          <LogoButtonImage src={OPLogo} />
        </LogoButton>
        <LogoButton
          className={classnames('button', {'is-active': this.state.openedTextArea === 'nordea'})}
          onClick={this.toggleTextArea('nordea')}
        >
          <LogoButtonImage src={NordeaLogo} />
        </LogoButton>
      </AddRowsToggleButtons>
      <TextAreaToggle isOpen={this.state.openedTextArea}>
        <TextArea className="textarea" onChange={this.handleOnInputChange} placeholder="Liitä rivejä tiliotteesta tähän" />
        <button className="button is-link" onClick={this.handleSend}>
          <span>Lisää</span>
          <span className="icon is-small">
            <i className="fas fa-save" />
          </span>
        </button>
      </TextAreaToggle>
    </RowsInputWrapper>
  }
}
