import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {resizeHandler} from '@/component/table/table.resize';
import {shouldResize, shouldSelect} from '@/component/table/table.functions';
import {TableSelection} from '@/component/table/TableSelection';
import {range, matrix, nextSelectCell} from '@core/utils';
import {$} from '@core/Dom';
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['keydown', 'input', 'mousedown'],
      ...options
    });
  }

  toHTML() {
    return createTable(30, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })

    this.$on('formula:focus', () => {
      this.selection.current.focus()
    })

    // const cols = this.$getState()
    // Object.keys(cols.colState).forEach(key => {
    //   const cells = this.$root.findAll(`[data-col="${key}"]`)
    //   cells.forEach((el) => {
    //     el.style.width = cols.colState[key] + 'px'
    //   })
    // })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    this.$dispatch({type: 'TEST'})
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn(e)
    }
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
      this.resizeTable(event)
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

  updateTextInStore(value) {
    const id = this.selection.current.id()
    this.$dispatch(actions.changeText({
      id, value
    }))
  }

  onInput(event) {
    const value = $(event.target).text()
    this.updateTextInStore(value)
    // this.$emit('table:input', text)
  }
}


