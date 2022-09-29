import React, { Component, FC, useRef, useState } from "react";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import Input from "../Input/Input";
import { amountInputValidator } from "../../common/validators/amountValidator";
import { Budget, addBudget } from "../../redux/budget/budgetSlice";
import { useAppDispatch } from "../../redux/store";

interface NewCategoryBudgetInputGroupProps {
  title: string;
  budgetKey: string;
}

const AddNewRowLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const NewCategoryBudgetInputGroupContainer = styled.div`
  margin: 15px 0;
`;

const AmountInput = styled.input`
  width: 160px;
`;

const CategoryInput = styled.input`
  width: 160px;
`;

const NewCategoryBudgetInputGroup: FC<NewCategoryBudgetInputGroupProps> = ({
  title,
  budgetKey,
}) => {
  const [isValid, setIsValid] = useState(false);
  const categoryInput = useRef<Input>(null);
  const amountInput = useRef<Input>(null);
  const dispatch = useAppDispatch();

  const addCategoryBudget = async () => {
    const categoryBudget: Budget = {
      category: categoryInput.current?.getValue(),
      amount: parseFloat(amountInput.current?.getValue()),
    };
    const budget = { key: budgetKey, budget: categoryBudget };
    dispatch(addBudget(budget));

    categoryInput.current?.clear();
    amountInput.current?.clear();
  };

  const onInputChange = () => {
    setIsValid(
      !!(categoryInput.current?.isValid() && amountInput.current?.isValid()),
    );
  };

  return (
    <NewCategoryBudgetInputGroupContainer>
      <AddNewRowLabel>{title}:</AddNewRowLabel>
      <div className="columns">
        <div className="column is-narrow">
          <CategoryInput
            as={Input}
            placeholder="Kategoria"
            validate={(value: any) => !isEmpty(value)}
            ref={categoryInput}
          />
        </div>

        <div className="column is-narrow">
          <AmountInput
            as={Input}
            placeholder="Määrä *"
            validate={amountInputValidator}
            ref={amountInput}
            onChange={onInputChange}
          />
        </div>

        <div className="column is-narrow">
          <p className="is-inline-flex">
            <button
              className="button is-link"
              onClick={addCategoryBudget}
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
    </NewCategoryBudgetInputGroupContainer>
  );
};

export default NewCategoryBudgetInputGroup;
