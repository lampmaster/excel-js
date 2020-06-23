import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/Dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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
    const $input = this.$root.find('#formula')

    // this.$on('table:input', text => {
    //   $input.text(text)
    // })

    this.$on('table:select', $currentCell => {
      const text = $currentCell.text();
      console.log('select', text)
      $input.text(text)
    })

    this.$on('table:input', text => {
      $input.text(text)
    })
    
    this.$subscribe(state => {
      $input.text(state.currentText)
      console.log('formulaState', state.currentText)
    })
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
