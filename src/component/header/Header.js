import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions'
import {$} from '@core/Dom';
import {defaultTableName} from '@/constants';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  init() {
    super.init()
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  storeChanged(s) {
    console.log(s)
  }

  toHTML() {
    const title = this.store.getState().tableName || defaultTableName
    return `<input type="text" class="input" value="${title}">

            <div>

                <div class="button">
                    <i class="material-icons">delete</i>
                </div>

                <div class="button">
                    <i class="material-icons">exit_to_app</i>
                </div>

            </div>`
  }
}
