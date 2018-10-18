import React, {Component} from 'react'
import Calendar from 'react-calendar'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { DateTime } from 'luxon'

const MonthSelectionWrapper = styled.div`
  text-align: center;
  margin-bottom: 10px;
`

const CalendarWrapper = styled.div`
  z-index: 1;
  position: absolute;
  visibility: ${props => props.visible ? 'visible' : 'hidden'}
`

const MONTHS = ['',
  'Tammikuu',
  'Helmikuu',
  'Maaliskuu',
  'Huhtikuu',
  'Toukokuu',
  'Kesäkuu',
  'Heinäkuu',
  'Elokuu',
  'Syyskuu',
  'Lokakuu',
  'Marraskuu',
  'Joulukuu',
]

class MonthSelection extends Component {
  state = {
    calendarIsOpen: false,
  }

  closeCalendar = () => {
    if (this.state.calendarIsOpen) {
      this.setState({
        calendarIsOpen: false,
      })
    }
  }

  toggleCalendar = () => {
    this.setState({
      calendarIsOpen: !this.state.calendarIsOpen,
    })
  }

  selectMonth = (value) => {
    this.props.selectMonth(value)
    this.setState({
      calendarIsOpen: !this.state.calendarIsOpen,
    })
  }

  selectPrevMonth = () => {
    this.props.selectMonth(DateTime.fromJSDate(this.props.selectedMonth).minus({month: 1}).toJSDate())
  }

  selectNextMonth = () => {
    this.props.selectMonth(DateTime.fromJSDate(this.props.selectedMonth).plus({month: 1}).toJSDate())
  }

  render() {
    const monthLabel = MONTHS[parseInt(DateTime.fromJSDate(this.props.selectedMonth).toFormat('M'))]

    return <MonthSelectionWrapper>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <a className="button is-centered is-rounded" onClick={this.selectPrevMonth}>
            <span className="icon">
              <i className="fas fa-chevron-left" />
            </span>
          </a>
        </div>
        <div className="control">
          <a className="button is-rounded" onClick={this.toggleCalendar}>{monthLabel}</a>
          <CalendarWrapper visible={this.state.calendarIsOpen} handleClickOutside={this.closeCalendar}>
            <OutsideClickHandler onOutsideClick={this.closeCalendar}>
              <Calendar
                view="year"
                maxDetail="year"
                minDetail="decade"
                onDrillUp={this.toggleCalendar}
                locale="fi-FI"
                value={this.props.selectedMonth}
                onClickMonth={this.selectMonth}
              />
            </OutsideClickHandler>
          </CalendarWrapper>
        </div>
        <div className="control">
          <a className="button is-rounded" onClick={this.selectNextMonth}>
            <span className="icon">
              <i className="fas fa-chevron-right" />
            </span>
          </a>
        </div>
      </div>
    </MonthSelectionWrapper>
  }

}

export default MonthSelection