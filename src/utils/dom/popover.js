import { docScroll, docSize } from './document'

const posKeys = ['left', 'top', 'bottom', 'right']
export const getPosition = (position, el, container = document.body) => {
  const rect = el.getBoundingClientRect()
  let containerRect = { top: 0, left: 0, bottom: 0, right: 0 }
  if (container.tagName === 'BODY') container = undefined
  if (container) containerRect = container.getBoundingClientRect()
  const scrollTop = container ? 0 : docScroll.top
  const scrollLeft = container ? 0 : docScroll.left

  const pos = {}
  switch (position) {
    case 'top-left':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'top':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width / 2
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'top-right':
      pos.right = (containerRect.right || docSize.width) - rect.right - scrollLeft
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'left-top':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'left':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top + rect.height / 2
      break
    case 'left-bottom':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.bottom - containerRect.bottom
      break
    case 'right-top':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width
      pos.top = scrollTop + rect.top - containerRect.top
      break
    case 'right':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width
      pos.top = scrollTop + rect.top - containerRect.top + rect.height / 2
      break
    case 'right-bottom':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width
      pos.top = scrollTop + rect.bottom - containerRect.bottom
      break
    case 'bottom-left':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top + rect.height
      break
    case 'bottom':
      pos.left = scrollLeft + rect.left - containerRect.left + rect.width / 2
      pos.top = scrollTop + rect.top - containerRect.top + rect.height
      break
    case 'bottom-right':
      pos.right = (containerRect.right || docSize.width) - rect.right - scrollLeft
      pos.top = scrollTop + rect.top - containerRect.top + rect.height
      break
    case 'cover':
      pos.left = scrollLeft + rect.left - containerRect.left
      pos.top = scrollTop + rect.top - containerRect.top
      break
    default:
  }

  return posKeys.reduce(
    (data, key) => ({
      ...data,
      [key]: typeof pos[key] === 'number' ? `${Math.round(pos[key])}px` : 'auto',
    }),
    {}
  )
}

export function getOriginPosition(el, container = document.body) {
  const rect = el.getBoundingClientRect()
  let containerRect = { top: 0, left: 0, bottom: 0, right: 0 }
  if (container.tagName === 'BODY') container = undefined
  const scroll = {
    top: docScroll.top,
    left: docScroll.left,
  }
  if (container) {
    containerRect = container.getBoundingClientRect()
    scroll.top = 0
    scroll.left = 0
  }

  // base point = bottom-left
  return {
    top: rect.top - containerRect.top + rect.height + scroll.top,
    left: rect.left - containerRect.left + scroll.left,
    parentRect: {
      width: rect.width,
      height: rect.height,
    },
  }
}

export function getTransformOrigin(...args) {
  const [first, sec] = args
  const transformOrigin = {
    x: 0,
    y: 0,
  }

  if (first === 'top' || sec === 'bottom') {
    transformOrigin.y = '100%'
  } else if ((first === 'right' || first === 'left') && !sec) {
    transformOrigin.y = '50%'
  }

  if (first === 'left' || sec === 'right') {
    transformOrigin.x = '100%'
  } else if ((first === 'top' || first === 'bottom') && !sec) {
    transformOrigin.x = '50%'
  }

  return `${transformOrigin.x} ${transformOrigin.y}`
}
