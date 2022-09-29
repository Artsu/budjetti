import React, { Component } from "react";
import styled from "styled-components";
import capitalize from "capitalize";

const Input = styled.input`
  margin-top: 0;
  margin-bottom: 0;
`;

export default class CategoryInput extends Component {
  state = {
    value: "",
  };

  saveCategory = () => {
    const entry = this.props.item;
    this.props.updateEntryCategory(entry.id, this.state.value.toLowerCase());

    const transceiverHasDefaultCategory = this.props.categories.find(
      (category) => category.transceiver === entry.transceiver,
    );
    if (!transceiverHasDefaultCategory) {
      this.props.saveCategory({
        transceiver: entry.transceiver,
        category: this.state.value.toLowerCase(),
      });
    }
    this.setState({
      value: "",
    });
  };

  updateValue = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  clearCategory = () => {
    this.props.updateEntryCategory(this.props.item.id, "");
  };

  render() {
    const { category } = this.props.item;

    if (category) {
      return (
        <div className="tags has-addons" style={{ justifyContent: "flex-end" }}>
          <span className="tag is-info">{capitalize(category)}</span>
          <a className="tag is-delete" onClick={this.clearCategory} />
        </div>
      );
    }

    return (
      <div className="field has-addons">
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
    );
  }
}
