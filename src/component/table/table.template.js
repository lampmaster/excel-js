const CODE = {
  A: 65,
  Z: 90
}

function createCell(row) {
  return function(_, col) {
    return `<div class="cell" 
               contenteditable 
               data-type="cell"
               data-col="${col}"
               data-id="${row}:${col}"
            >
          </div>`
  }
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

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(colsCount)
      .fill('')
      // .map((_, col) => createCell(col, row))
      .map(createCell(row))
      .join('')

    rows.push(createRow(row + 1, cell) )
  }
  return rows.join('')
}
