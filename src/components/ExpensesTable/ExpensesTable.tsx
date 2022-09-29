import React, { Fragment, FC, useState } from "react";
import styled from "styled-components";
import { DateTime } from "luxon";
import CategoryInput from "../CategoryInput/CategoryInputContainer";
import EditableCell from "../EditableCell/EditableCell";
import { getDateFormat } from "../../common/validators/dateValidator";
import { Entry } from "../../common/types";
import RemoveRowVerifyModal from "./RemoveRowVerifyModal";
import { updateEntry, deleteEntry } from "../../redux/entries/entriesSlice";
import { useDispatch } from "react-redux";
import entriesDb from "../../db/entriesDb";

const CenteredColumn = styled.td`
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  th.centered {
    text-align: center;
  }
`;

const TdAlignCenter = styled.td`
  text-align: center;
`;

const TdAlignRight = styled.td`
  text-align: right;
`;

const ThDate = styled.th`
  width: 130px;
`;
const ThAmount = styled.th`
  width: 130px;
`;
const ThCategory = styled.th`
  width: 200px;
`;
const ThAccount = styled.th`
  width: 130px;
`;
const ThRemove = styled.th`
  width: 50px;
`;

const EntryRow = styled.tr<{ deleted: boolean }>`
  transition: opacity 0.5s, visibility 0.5s;
  opacity: ${(props) => (props.deleted ? "0" : "1")};
  visibility: ${(props) => (props.deleted ? "collapse" : "visible")};
`;

interface ExpensesTableProps {
  entries: Entry[];
}

const ExpensesTable: FC<ExpensesTableProps> = (props) => {
  const { entries = [] } = props;

  const dispatch = useDispatch();
  const [verifyDeleteModalKey, setVerifyDeleteModalKey] = useState<
    string | null
  >(null);
  const [deletedCategory, setDeletedCategory] = useState<string | null>(null);
  const [editMode, setEditMode] = useState({
    date: null,
    transceiver: null,
    amount: null,
  });

  const deleteRow = (key: string) => {
    return () => {
      setVerifyDeleteModalKey(key);
    };
  };

  const handleEntryUpdate = async (updatedEntry: Entry) => {
    await entriesDb().set(updatedEntry.id as string, updatedEntry);
    dispatch(updateEntry(updatedEntry));
  };

  const updateDateForEntry = (entry: Entry) => {
    return async (date: string) => {
      const format = getDateFormat(date);
      const updatedEntry = {
        ...entry,
        date: DateTime.fromFormat(date, format).toJSDate(),
      };
      await handleEntryUpdate(updatedEntry);
    };
  };

  const updateTransceiverForEntry = (entry: Entry) => {
    return async (transceiver: string) => {
      const updatedEntry = {
        ...entry,
        transceiver,
      };
      await handleEntryUpdate(updatedEntry);
    };
  };

  const updateAmountForEntry = (entry: Entry) => {
    return async (amount: string) => {
      const updatedEntry = {
        ...entry,
        amount: parseFloat(amount),
      };
      await handleEntryUpdate(updatedEntry);
    };
  };
  console.log("entries", entries);
  return (
    <Fragment>
      <Table className="table is-striped is-bordered is-hoverable">
        <thead>
          <tr>
            <ThDate>Pvm</ThDate>
            <th>Saaja</th>
            <ThAmount>Määrä</ThAmount>
            <ThCategory>Kategoria</ThCategory>
            <ThAccount>Tili</ThAccount>
            <ThRemove className="centered">Poista</ThRemove>
          </tr>
        </thead>
        <tbody>
          {entries.map((item) => {
            if (!item.id) {
              return null;
            }

            const dateTime = DateTime.fromJSDate(item.date).toLocal();
            return (
              <EntryRow
                key={`${item.id}-${item.transceiver}-${dateTime.toISO()}`}
                deleted={deletedCategory === item.id}
              >
                <EditableCell.Date
                  onSubmit={updateDateForEntry(item)}
                  value={dateTime.toFormat("dd.MM.yyyy")}
                />
                <EditableCell.Transceiver
                  onSubmit={updateTransceiverForEntry(item)}
                  value={item.transceiver}
                />
                <EditableCell.Amount
                  onSubmit={updateAmountForEntry(item)}
                  value={item.amount}
                />
                <TdAlignRight>{/*<CategoryInput item={item} />*/}</TdAlignRight>
                <TdAlignCenter>{item.account}</TdAlignCenter>
                <CenteredColumn>
                  <a className="delete" onClick={deleteRow(item.id)} />
                </CenteredColumn>
              </EntryRow>
            );
          })}
        </tbody>
      </Table>
      <RemoveRowVerifyModal
        show={!!verifyDeleteModalKey}
        itemToRemove={props.entries.find(
          (entry) => entry.id === verifyDeleteModalKey,
        )}
        deleteEntry={(id) => {
          dispatch(deleteEntry(id));
          setDeletedCategory(id);
          setVerifyDeleteModalKey(null);
        }}
        cancel={() => {
          setVerifyDeleteModalKey(null);
        }}
      />
    </Fragment>
  );
};

export default ExpensesTable;
