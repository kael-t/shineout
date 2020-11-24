import ReactDom from 'react-dom'

export const docScroll = {
  get top() {
    return document.documentElement.scrollTop || document.body.scrollTop
  },
  get left() {
    return document.documentElement.scrollLeft || document.body.scrollLeft
  },
  set top(value) {
    document.documentElement.scrollTop = value
    document.body.scrollTop = value
  },
  set left(value) {
    document.documentElement.scrollLeft = value
    document.body.scrollLeft = value
  },
}

export const docSize = {
  get width() {
    return window.innerWidth || document.documentElement.clientWidth
  },
  get height() {
    return window.innerHeight || document.documentElement.clientHeight
  },
}

export const addEventListener = (target, eventType, cb, option) => {
  const callback = ReactDom.unstable_batchedUpdates
    ? function run(e) {
        ReactDom.unstable_batchedUpdates(cb, e)
      }
    : cb

  if (target.addEventListener) {
    target.addEventListener(eventType, callback, option)
  }

  return {
    remove: function remove() {
      if (target.removeEventListener) {
        target.removeEventListener(eventType, callback)
      }
    },
  }
}
