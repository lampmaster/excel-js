import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions'
import {$} from '@core/Dom';
import {defaultTableName} from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  init() {
    super.init()
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(actions.changeTitle($target.text()))
  }

  storeChanged(s) {
  }

  toHTML() {
    const title = this.store.getState().tableName || defaultTableName
    return `<input type="text" class="input" value="${title}">

            <div>

                <div class="button" data-button="delete">
                    <i class="material-icons" data-button="delete">delete</i>
                </div>

                <div class="button" data-button="exit">
                    <i 
                     class="material-icons"
                     data-button="exit">exit_to_app</i>
                </div>

            </div>`
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'delete') {
      const decision = confirm('Do you really want to delete the table')
      if (decision) {
        localStorage.removeItem('excel_' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
