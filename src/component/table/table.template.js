import {defaultStyles} from '@/constants';
import {stylesToString} from '@core/utils';
import {parse} from '@core/parse';

const CODE = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function getData(state, row, col) {
  return (state[row + ':' + col] || '')
}

function createCell(row, state) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = getData(state.dataState, row, col)
    const styles = stylesToString({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `<div class="cell" 
               contenteditable 
               data-type="cell"
               data-col="${col}"
               data-id="${row}:${col}"
               data-value="${data || ''}"
               style="${styles}; width: ${width}"
            >${parse(data) || ''}
          </div>`
  }
}

function createColumn({col, index, width}) {
  return `<div class="column"
                data-type="resizable"
                data-col="${index}"
                style="width: ${width}"
          >
             ${col}
             <div class="col-resize" data-resize="col"></div>
             <div class="col-resize-line" data-resize-line="col"></div>
          </div>`
}

function createRow(index, column, state) {
  const height = getHeight(state, index)
  const resize = index ? `<div class="row-resize" 
                               data-resize="row">
                          </div>
                          <div class="row-resize-line" 
                          data-resize-line="row">
                          </div>` : ''

  return `<div class="row"
               data-type="resizable"
               data-row="${index}"
               style="height: ${height}">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${column}</div>
          </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODE.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 60, state = {}) {
  const colsCount = CODE.Z - CODE.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(createColumn)
    .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(colsCount)
      .fill('')
      // .map((_, col) => createCell(col, row))
      .map(createCell(row, state))
      .join('')

    rows.push(createRow(row + 1, cell, state.rowState) )
  }
  return rows.join('')
}
