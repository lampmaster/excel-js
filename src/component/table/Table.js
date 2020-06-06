import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {resizeTable} from '@/component/table/table.resize';
import {shouldResize, shouldSelect} from '@/component/table/table.functions';
import {TableSelection} from '@/component/table/TableSelection';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'mousemove', 'mouseup'],
      name: 'Table'
    });
  }

  toHTML() {
    return createTable()
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }

  onMousedown(event) {
    if (shouldSelect(event)) {
      const $cell = $(event.target)
      this.selection.select($cell)

      onmousemove = e => {
        if (event.target !== e.target && shouldSelect(e)) {
          const first = $(event.target).id(true)
          const current = $(e.target).id(true)

          const cols = range(first.col, current.col)
          const rows = range(first.row, current.row)
          const matr = matrix(rows, cols)
          console.log(matr)
          const $cells = matrix(rows, cols)
            .map(id => this.$root.find(`[data-id="${id}"]`))
          this.selection.selectGroup($cells)
        }
      }

      onmouseup = () => {
        onmousemove = null
        onmouseup = null
      }
    }

    if (shouldResize(event)) {
      resizeTable(event, this.$root)
    }
  }

  onMousemove(event) {
    // console.log('mousemove', event.clientY)

  }

  onMouseup() {
    // console.log('up')
  }
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
