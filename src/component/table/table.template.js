const CODE = {
  A: 65,
  Z: 90
}

function createCell() {
  return `<div class="cell" contenteditable>Data</div>`
}

function createColumn(char) {
  return `<div class="column">
             ${char}
          </div>`
}

function createRow(index, column) {
  return `<div class="row">
            <div class="row-info">${index ? index : ''}</div>
            <div class="row-data">${column}</div>
          </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODE.A + index)
}


export function createTable(rowsCount = 20) {
  const colsCount = CODE.Z - CODE.A + 1
  const rows = []
  console.log(colsCount)
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createColumn).join('')
  console.log(cols)

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
