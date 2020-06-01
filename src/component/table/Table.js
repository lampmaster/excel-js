import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/component/table/table.template';
import {resizeTable} from '@/component/table/table.resize';
import {shouldResize} from '@/component/table/table.functions';

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

  onMousedown(event) {
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
