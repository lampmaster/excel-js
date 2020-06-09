import {DOMListener} from '@core/DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []

    this.prepare()
  }

  prepare() {}

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $subscribe(event, fn) {
    const unsubscribe = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsubscribe)
  }


  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
