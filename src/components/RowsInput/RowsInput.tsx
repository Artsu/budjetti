import React, { Component, FC, useState } from "react";
import styled from "styled-components";
import Promise from "bluebird";
import classnames from "classnames";
import Image from "next/image";
import { parseOPCopyPaste, parseNordeaCopyPaste } from "./bankCPParseTool";

import OPLogo from "../../assets/op-logo.png";
import NordeaLogo from "../../assets/nordea-logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Account } from "../../common/types";

const RowsInputWrapper = styled.div``;
const AddRowsToggleButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const LogoButton = styled.a`
  margin: 0 5px;
  position: relative;
  width: 100px;
`;

const LogoButtonImage = styled(Image)`
  height: 30px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
`;

const TextAreaToggle = styled.div<{ isOpen: boolean }>`
  transition: max-height 0.5s ease-in-out;
  max-height: ${(props) => (props.isOpen ? "400" : "0")}px;
  overflow: hidden;
`;

const RowsInput: FC = () => {
  const [value, setValue] = useState("");
  const [openedTextArea, setOpenedTextArea] = useState<Account | null>(null);
  const categories = useSelector(
    (state: RootState) => state.categories.defaultTransceiverCategories,
  );

  const handleOnInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setValue(event.currentTarget.value);
  };

  const handleSend = () => {
    const entries = [];
    switch (openedTextArea) {
      case "op":
        entries.push(...parseOPCopyPaste(value));
        break;
      case "nordea":
        entries.push(...parseNordeaCopyPaste(value));
        break;
    }

    const entriesWithDefaultCategories = entries.map((entry) => {
      const defaultCategory = categories.find(
        (c) => c.transceiver === entry.transceiver,
      );
      if (defaultCategory) {
        entry.category = defaultCategory.category;
      }
      return entry;
    });

    // addEntries(entriesWithDefaultCategories);
    setValue("");
    setOpenedTextArea(null);
    // TODO: Show notification for how many rows were added
  };

  const toggleTextArea = (account: Account) => {
    return async () => {
      if (openedTextArea) {
        const openState = openedTextArea;
        setOpenedTextArea(null);
        if (openState === account) {
          return;
        }

        await Promise.delay(500);
      }

      setOpenedTextArea(account);
    };
  };

  return (
    <RowsInputWrapper>
      <AddRowsToggleButtons>
        Lisää rivejä:
        <LogoButton
          className={classnames("button", {
            "is-active": openedTextArea === "op",
          })}
          onClick={toggleTextArea("op")}
        >
          <LogoButtonImage layout="intrinsic" src={OPLogo} />
        </LogoButton>
        <LogoButton
          className={classnames("button", {
            "is-active": openedTextArea === "nordea",
          })}
          onClick={toggleTextArea("nordea")}
        >
          <LogoButtonImage layout="intrinsic" src={NordeaLogo} />
        </LogoButton>
      </AddRowsToggleButtons>
      <TextAreaToggle isOpen={!!openedTextArea}>
        <TextArea
          className="textarea"
          value={value}
          onChange={handleOnInputChange}
          placeholder="Liitä rivejä tiliotteesta tähän"
        />
        <button className="button is-link" onClick={handleSend}>
          <span>Lisää</span>
          <span className="icon is-small">
            <i className="fas fa-save" />
          </span>
        </button>
      </TextAreaToggle>
    </RowsInputWrapper>
  );
};

export default RowsInput;
