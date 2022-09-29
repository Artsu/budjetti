import React, { Component, FC, useRef, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import Input from "../Input/Input";
import { addEntries } from "../../redux/entries/entriesSlice";
import {
  dateInputValidator,
  getDateFormat,
} from "../../common/validators/dateValidator";
import { amountInputValidator } from "../../common/validators/amountValidator";
import { Entry } from "../../common/types";
import entriesDb from "../../db/entriesDb";

const AddNewRowLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const NewEntryInputGroupContainer = styled.div`
  margin: 15px 0;
`;

const DateInput = styled.input`
  width: 140px;
`;

const TransceiverInput = styled.input``;

const AmountInput = styled.input`
  width: 160px;
`;

const CategoryInput = styled.input`
  width: 160px;
`;

const AccountInput = styled.input`
  width: 160px;
`;

const NewEntryInputGroup: FC = () => {
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const dateEl = useRef<Input>(null);
  const transceiverEl = useRef<Input>(null);
  const amountEl = useRef<Input>(null);
  const categoryEl = useRef<Input>(null);
  const accountEl = useRef<Input>(null);

  const addEntry = async () => {
    const dateValue = dateEl.current?.getValue();
    const format = getDateFormat(dateValue);
    const entry: Entry = {
      date: DateTime.fromFormat(dateValue, format).toJSDate(),
      transceiver: transceiverEl.current?.getValue(),
      amount: parseFloat(amountEl.current?.getValue()),
      category: categoryEl.current?.getValue(),
      account: accountEl.current?.getValue(),
    };

    await entriesDb().add(entry);
    dispatch(addEntries([entry]));

    dateEl.current?.clear();
    transceiverEl.current?.clear();
    amountEl.current?.clear();
    categoryEl.current?.clear();
    accountEl.current?.clear();
  };

  const onInputChange = () => {
    setIsValid(
      !!(
        dateEl.current?.isValid() &&
        transceiverEl.current?.isValid() &&
        amountEl.current?.isValid()
      ),
    );
  };

  return (
    <NewEntryInputGroupContainer>
      <AddNewRowLabel>Lisää uusi rivi:</AddNewRowLabel>
      <div className="columns">
        <div className="column is-narrow">
          <DateInput
            placeholder="Päivämäärä *"
            as={Input}
            validate={dateInputValidator}
            ref={dateEl}
            onChange={onInputChange}
          />
        </div>

        <div className="column">
          <TransceiverInput
            as={Input}
            placeholder="Saaja / lähettäjä *"
            ref={transceiverEl}
            onChange={onInputChange}
          />
        </div>

        <div className="column is-narrow">
          <AmountInput
            as={Input}
            placeholder="Määrä *"
            validate={amountInputValidator}
            ref={amountEl}
            onChange={onInputChange}
          />
        </div>

        <div className="column is-narrow">
          <CategoryInput as={Input} placeholder="Kategoria" ref={categoryEl} />
        </div>

        <div className="column is-narrow">
          <AccountInput as={Input} placeholder="Tili" ref={accountEl} />
        </div>

        <div className="column is-narrow">
          <p className="is-inline-flex">
            <button
              className="button is-link"
              onClick={addEntry}
              disabled={!isValid}
            >
              <span>Tallenna</span>
              <span className="icon is-small">
                <i className="fas fa-save" />
              </span>
            </button>
          </p>
        </div>
      </div>
    </NewEntryInputGroupContainer>
  );
};

export default NewEntryInputGroup;
