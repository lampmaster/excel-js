import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {resizeTable} from '@/component/table/table.resize';
import {shouldResize, shouldSelect} from '@/component/table/table.functions';
import {TableSelection} from '@/component/table/TableSelection';
import {range, matrix, nextSelectCell} from '@core/utils';
import {$} from '@core/Dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['keydown', 'input'],
      ...options
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
    this.$subscribe('formula:input', text => {
      this.selection.current.text(text)
    })

    this.$subscribe('formula:focus', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldSelect(event)) {
      const $cell = $(event.target)
      this.selectCell($cell)

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

  onKeydown(event) {
    const keyMap = [
      'Tab',
      'ArrowRight',
      'Enter',
      'ArrowDown',
      'ArrowUp',
      'ArrowLeft'
    ]

    if (keyMap.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const key = event.key
      const currentCellId = this.selection.current.id(true)
      const $nextCell = this.$root.find(nextSelectCell(key, currentCellId))
      this.selectCell($nextCell)
    }
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$emit('table:input', text)
  }
}


