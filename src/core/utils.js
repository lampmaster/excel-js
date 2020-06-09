export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }

  return string[0].toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    return range(end, start)
  }

  const arr = []

  for (let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr
}

export function matrix(rows, cols) {
  const matrixArr = []
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      matrixArr.push(`${rows[i]}:${cols[j]}`)
    }
  }

  return matrixArr
}

export function nextSelectCell(key, {row, col}) {
  const MIN_VAL = 0

  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col = col === MIN_VAL ? col : --col
      break
    case 'ArrowUp':
      row = row === MIN_VAL ? row : --row
      break
    default:
      throw new Error(`Action for key ${key} not found`)
  }

  return `[data-id="${row}:${col}"]`
}
