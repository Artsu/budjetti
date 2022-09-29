import React, { FC, useState } from "react";
import EditableCell from "../EditableCell/EditableCell";
import styled from "styled-components";
import VerifyModal from "../Modal/VerifyModal";
import { useSelector } from "react-redux";
import {
  deleteBudgetCategory,
  renameBudgetCategory,
  updateBudgetAmount,
} from "../../redux/budget/budgetSlice";
import { RootState, useAppDispatch } from "../../redux/store";

interface BudgettingTableProps {
  budgetKey: string;
}

const CenteredColumn = styled.td`
  text-align: center;
`;
const Table = styled.table`
  width: 100%;
`;
const ThAmount = styled.th`
  width: 130px;
`;
const ThCategory = styled.th`
  width: 200px;
`;
const ThRemove = styled.th`
  width: 50px;
`;
const BudgetRow = styled.tr<{ deleted?: boolean }>`
  transition: opacity 0.5s, visibility 0.5s;
  opacity: ${(props) => (props.deleted ? "0" : "1")};
  visibility: ${(props) => (props.deleted ? "collapse" : "visible")};
`;

const BudgettingTable: FC<BudgettingTableProps> = (props) => {
  const { budgetKey } = props;
  const [deletedCategory, setDeletedCategory] = useState<string | null>(null);
  const [verifyDeleteModalKey, setVerifyDeleteModalKey] = useState<
    string | null
  >(null);
  const key = budgetKey === "repeating" ? "repeating" : "monthly";
  const rows = useSelector((state: RootState) => state.budget[key]);
  const dispatch = useAppDispatch();

  const updateCategory = (category: string) => {
    return (newCategoryName: string) => {
      dispatch(
        renameBudgetCategory({
          key: budgetKey,
          category,
          newCategoryName,
        }),
      );
    };
  };

  const updateAmount = (category: string) => {
    return (amount: string) => {
      dispatch(
        updateBudgetAmount({
          key: budgetKey,
          category,
          amount: parseFloat(amount),
        }),
      );
    };
  };

  const verifyDeleteRow = (category: string) => {
    return () => {
      setVerifyDeleteModalKey(category);
    };
  };

  const deleteRow = (category: string) => {
    dispatch(deleteBudgetCategory({ key: budgetKey, category }));
    setDeletedCategory(category);
    setVerifyDeleteModalKey(null);
  };

  const categoryBudgetToRemove = rows.find(
    (budget) => budget.category === verifyDeleteModalKey,
  );

  return (
    <>
      <Table className="table is-bordered">
        <thead>
          <tr>
            <ThCategory>Kategoria</ThCategory>
            <ThAmount>Budjetti</ThAmount>
            <ThRemove className="centered">Poista</ThRemove>
          </tr>
        </thead>
        <tbody>
          {rows.map((budget) => {
            return (
              <BudgetRow key={`${budget.category}}`}>
                <EditableCell.Category
                  onSubmit={updateCategory(budget.category)}
                  value={budget.category}
                />
                <EditableCell.Amount
                  onSubmit={updateAmount(budget.category)}
                  value={budget.amount}
                />
                <CenteredColumn>
                  <a
                    className="delete"
                    onClick={verifyDeleteRow(budget.category)}
                  />
                </CenteredColumn>
              </BudgetRow>
            );
          })}
        </tbody>
      </Table>
      <VerifyModal
        title="Haluatko varmasti poistaa rivin?"
        show={!!verifyDeleteModalKey}
        label={
          categoryBudgetToRemove &&
          `${categoryBudgetToRemove.category}, ${categoryBudgetToRemove.amount}`
        }
        onDeleteClick={() => {
          const cat = categoryBudgetToRemove?.category;
          if (cat) {
            deleteRow(cat);
          }
        }}
        onCancelClick={() => {
          setVerifyDeleteModalKey(null);
        }}
      />
    </>
  );
};

export default BudgettingTable;
