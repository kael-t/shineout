import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { anchorClass } from '../styles'
import AnchorContext from './context'
import { addEventListener } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'

class Anchor extends Component {
  static propTypes = {}

  constructor(props) {
    super(props)
    this.links = []

    this.state = {
      activeLink: null,
    }

    this.targetDom = null
    this.scrollEvent = null

    this.scrollTo = false

    this.registerLink = this.registerLink.bind(this)
    this.unregisterLink = this.unregisterLink.bind(this)
    this.cacheDom = this.cacheDom.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    this.targetDom = this.getContainer()
    this.scrollEvent = addEventListener(this.targetDom, 'scroll', this.handleScroll)
    this.handleScroll()
  }

  componentDidUpdate() {
    if (this.scrollEvent) {
      const currentContainer = this.getContainer()
      if (this.targetDom !== currentContainer) {
        this.targetDom = currentContainer
        this.scrollEvent.remove()
        this.scrollEvent = addEventListener(this.targetDom, 'scroll', this.handleScroll)
        this.handleScroll()
      }
    }
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove()
      this.targetDom = null
      this.scrollEvent = null
    }
  }

  getContainer() {
    const { target } = this.props
    if (!target) return window
    return getParent(this.element, target)
  }

  getCurrentAnchor() {
    let containerOffsetTop = 0
    if (this.targetDom === window) {
      containerOffsetTop = this.element.ownerDocument.documentElement.clientTop
    } else {
      containerOffsetTop = this.targetDom.getBoundingClientRect().top
    }
    console.log('containerOffsetTop: ', containerOffsetTop)
    const result = []
    this.links.forEach(value => {
      if (value.top <= containerOffsetTop) {
        result.push(value)
      }
    })
    if (result.length <= 0) return ''
    const target = result.reduce((prev, cur) => (cur.top > prev.top ? cur : prev))
    return target.link
  }

  registerLink(link, top) {
    if (this.links.findIndex(v => v.link === link) === -1) {
      this.links.push({ link, top })
    }
  }

  unregisterLink(link) {
    const index = this.links.findIndex(v => v.link === link)
    if (index !== -1) {
      this.links.splice(index, 1)
    }
  }

  handleScroll() {
    if (this.scrollTo) return
    const currentAnchor = this.getCurrentAnchor()
    console.log('currentAnchor: ', currentAnchor)
  }

  cacheDom(node) {
    this.element = node
  }

  render() {
    const { className, style, children } = this.props
    return (
      <AnchorContext.Provider
        value={{
          registerLink: this.registerLink,
          unregisterLink: this.unregisterLink,
          activeLink: this.state.activeLink,
        }}
      >
        <div style={style} className={classnames(anchorClass('_'), className)} ref={this.cacheDom}>
          <div className={anchorClass('container')}>{children}</div>
        </div>
      </AnchorContext.Provider>
    )
  }
}

export default Anchor
