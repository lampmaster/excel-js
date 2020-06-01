import {$} from '@core/Dom';

export function resizeTable(event, $root) {
  const $resize = $(event.target)
  const type = $resize.data.resize
  const $parent = $resize.closestParent('[data-type="resizable"]')
  const coords = $parent.getCoordinates();

  const cell = $root
    .findAll(`[data-col="${$parent.data.col}"]`)
  const $line = $parent
    .find(`[data-resize-line="${$resize.data.resize}"]`)

  let value
  document.onmousemove = e => {
    $line.css({opacity: '1'})
    $resize.css({opacity: 1})

    if (type === 'col') {
      const delta = e.clientX - coords.right
      value = coords.width + delta
      $resize.css({right: -delta + 'px'})
      $line.css({right: -delta + 'px'})
    } else {
      const delta = e.clientY - coords.bottom
      value = coords.height + delta
      $resize.css({bottom: -delta + 'px'})
      $line.css({bottom: -delta + 'px'})
    }
  }


  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $resize.css({right: 0 + 'px'})
      $line.css({right: 0 + 'px'})
      cell.forEach((el) => {
        el.style.width = value + 'px'
      })
    } else {
      $parent.css({height: value + 'px'})
      $resize.css({bottom: 0 + 'px'})
      $line.css({bottom: 0 + 'px'})
    }

    $resize.css({opacity: 0})
    $line.css({opacity: '0'})
    document.onmousemove = null
    document.onmouseup = null
  }
}
