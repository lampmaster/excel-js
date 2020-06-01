const CODE = {
  A: 65,
  Z: 90
}

function createCell(_, index) {
  return `<div class="cell" 
               contenteditable 
               data-col="${index}">
            Data
          </div>`
}

function createColumn(char, index) {
  return `<div class="column" data-type="resizable" data-col="${index}">
             ${char}
             <div class="col-resize" data-resize="col"></div>
             <div class="col-resize-line" data-resize-line="col"></div>
          </div>`
}

function createRow(index, column) {
  const resize = index ? `<div class="row-resize" 
                               data-resize="row">
                          </div>
                          <div class="row-resize-line" 
                          data-resize-line="row">
                          </div>` : ''

  return `<div class="row" data-type="resizable">
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


export function createTable(rowsCount = 60) {
  const colsCount = CODE.Z - CODE.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createColumn).join('')

  const cell = new Array(colsCount)
    .fill('')
    .map(createCell)
    .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cell) )
  }
  return rows.join('')
}
