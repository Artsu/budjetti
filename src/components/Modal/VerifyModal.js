import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export default class VerifyModal extends Component {

  render() {
    return ReactDOM.createPortal(
      <div className={'modal ' + (this.props.show && 'is-active')}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
          </header>

          <section className="modal-card-body">
            {this.props.label}
          </section>

          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={this.props.delete}>Poista</button>
            <button className="button" onClick={this.props.cancel}>Peruuta</button>
          </footer>
        </div>
      </div>,
      window.document.querySelector('body')
    )
  }

}