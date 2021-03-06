import isEmpty from 'lodash/isEmpty'
import { DateTime } from 'luxon'

const AMOUNT_REGEX = /^[-|+]?(\d| )+,\d{2}$/
const DATE_REGEX = /(ma|ti|ke|to|pe|la|su) \d{1,2}\.\d{1,2}./

export function parseOPCopyPaste(OPInput) {
  const elements = OPInput.split('\n')

  const entries = []

  let year = DateTime.utc().toFormat('yyyy')
  let date = null
  let entry = {}
  let skipNext = false

  const addEntry = () => {
    if (entry.amount && entry.transceiver) {
      entry.date = date
      entries.push(entry)
      entry = {}
    }
  }

  const nonEmptyElements = elements.filter(field => !isEmpty(field.trim()))
  nonEmptyElements.forEach((field, index) => {
    if (skipNext) {
      skipNext = false
      return
    }
    const row = field.trim()

    if (row.match(DATE_REGEX)) {
      addEntry()
      date = DateTime.fromFormat(`${row.substr(3)}${year}`, 'd.M.yyyy').toJSDate()
      return
    }

    // Extra row for current date
    if (row.indexOf('Käytettävissä') === 0) {
      skipNext = true
      return
    }

    if (row.match(AMOUNT_REGEX)) {
      entry.amount = parseFloat(row.replace(',', '.').replace(/\s+/g, ''))
      return
    }

    if (row.match(/^[a-z]* 20\d{2}$/)) {
      year = row.substr(row.indexOf('2'))
      skipNext = true
      return
    }

    if (entry.transceiver) {
      const nextRowStartsNewEntry = nonEmptyElements.length > index && nonEmptyElements[index+1].trim().match(AMOUNT_REGEX)
      if (nextRowStartsNewEntry) {
        addEntry()
        entry.transceiver = row
        return
      } else {
        entry.message = row
        return addEntry()
      }
    }

    entry.transceiver = row
  })
  addEntry()

  entries.forEach(entry => entry.account = 'OP')

  return entries
}

export function parseNordeaCopyPaste(NordeaInput) {
  const unrefinedRows = NordeaInput.split('\n')
  const entries = unrefinedRows.map(unrefinedRow => {
    const entry = unrefinedRow.split('\t')
    const amountWithPlusMinusIndicator = entry[3].replace(',', '.').trim()
    const indexOfPlusMinusIndicator = amountWithPlusMinusIndicator.length-1
    const indicator = amountWithPlusMinusIndicator.substring(indexOfPlusMinusIndicator) === '+' ? '' : '-'
    const amount = `${indicator}${amountWithPlusMinusIndicator.substring(0, indexOfPlusMinusIndicator)}`

    return {
      date: DateTime.fromFormat(entry[0].trim(), 'dd.MM.yyyy').toJSDate(),
      transceiver: entry[2].trim(),
      amount: parseFloat(amount),
      account: 'Nordea'
    }
  })

  return entries
}