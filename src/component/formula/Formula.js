import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init();
    this.$input = this.$root.find('#formula')

    this.$on('table:select', $currentCell => {
      const text = $currentCell.text();
      this.$input.text(text)
    })
  }

  storeChanged({currentText}) {
    this.$input.text(currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:focus')
    }
  }
}
