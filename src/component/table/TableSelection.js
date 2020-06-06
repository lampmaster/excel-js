export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    this.current = $el
    $el.addClass(TableSelection.className)
    this.group.push($el)
  }

  selectGroup(cells) {
    this.clear()
    cells.forEach($el => {
      $el.addClass(TableSelection.className)
      this.group.push($el)
    })
  }

  clear() {
    this.group.forEach($cell => $cell.removeClass(TableSelection.className))
    this.group = []
  }
}
