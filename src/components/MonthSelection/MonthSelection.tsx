import React, { FC, useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import OutsideClickHandler from "react-outside-click-handler";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { changeMonth } from "../../redux/ui/uiSlice";

import "react-calendar/dist/Calendar.css";

const MonthSelectionWrapper = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const CalendarWrapper = styled.div<{ visible: boolean }>`
  z-index: 1;
  position: absolute;
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
`;

const MONTHS = [
  "",
  "Tammikuu",
  "Helmikuu",
  "Maaliskuu",
  "Huhtikuu",
  "Toukokuu",
  "Kesäkuu",
  "Heinäkuu",
  "Elokuu",
  "Syyskuu",
  "Lokakuu",
  "Marraskuu",
  "Joulukuu",
];

const MonthSelection: FC = () => {
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const selectedMonth = useSelector((state: RootState) => state.ui.month);
  const dispatch = useDispatch();

  const selectMonth = (value: Date) => {
    dispatch(changeMonth(DateTime.fromJSDate(value).toFormat("yyyy/MM")));
    setCalendarIsOpen(false);
  };

  const selectPrevMonth = () => {
    dispatch(
      changeMonth(
        DateTime.fromFormat(selectedMonth, "yyyy/MM")
          .minus({ month: 1 })
          .toFormat("yyyy/MM"),
      ),
    );
  };

  const selectNextMonth = () => {
    dispatch(
      changeMonth(
        DateTime.fromFormat(selectedMonth, "yyyy/MM")
          .plus({ month: 1 })
          .toFormat("yyyy/MM"),
      ),
    );
  };

  const selectedMonthAsDate = DateTime.fromFormat(selectedMonth, "yyyy/MM");
  const monthLabel = MONTHS[parseInt(selectedMonthAsDate.toFormat("M"))];

  return (
    <MonthSelectionWrapper>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <a
            className="button is-centered is-rounded"
            onClick={selectPrevMonth}
          >
            <span className="icon">
              <i className="fas fa-chevron-left" />
            </span>
          </a>
        </div>
        <div className="control">
          <a
            className="button is-rounded"
            onClick={() => setCalendarIsOpen(!calendarIsOpen)}
          >
            {monthLabel}
          </a>
          <CalendarWrapper visible={calendarIsOpen}>
            <OutsideClickHandler
              onOutsideClick={() => setCalendarIsOpen(false)}
            >
              <Calendar
                view="year"
                maxDetail="year"
                minDetail="decade"
                onDrillUp={() => setCalendarIsOpen(!calendarIsOpen)}
                locale="fi-FI"
                value={selectedMonthAsDate.toJSDate()}
                onClickMonth={selectMonth}
              />
            </OutsideClickHandler>
          </CalendarWrapper>
        </div>
        <div className="control">
          <a className="button is-rounded" onClick={selectNextMonth}>
            <span className="icon">
              <i className="fas fa-chevron-right" />
            </span>
          </a>
        </div>
      </div>
    </MonthSelectionWrapper>
  );
};

export default MonthSelection;
