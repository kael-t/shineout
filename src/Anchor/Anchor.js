import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { anchorClass } from '../styles'
import AnchorContext from './context'
import { addEventListener } from '../utils/dom/document'
import { getParent } from '../utils/dom/element'
import Sticky from '../Sticky'

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
    const result = []
    this.links.forEach(value => {
      const dom = document.querySelector(value)
      if (dom) {
        const { top } = dom.getBoundingClientRect()
        if (top <= 0) {
          result.push({
            link: value,
            top,
          })
        }
      }
    })
    if (result.length <= 0) return ''
    const target = result.reduce((prev, cur) => (cur.top > prev.top ? cur : prev))
    return target.link
  }

  registerLink(link) {
    if (this.links.indexOf(link) === -1) {
      this.links.push(link)
    }
  }

  unregisterLink(link) {
    const index = this.links.indexOf(link)
    if (index !== -1) {
      this.links.splice(index, 1)
    }
  }

  handleScroll() {
    if (this.scrollTo) return
    const { activeLink } = this.state
    const currentAnchor = this.getCurrentAnchor()
    if (activeLink === currentAnchor) return
    this.setState({
      activeLink: currentAnchor,
    })
  }

  cacheDom(node) {
    this.element = node
  }

  render() {
    const { className, style, children, affix } = this.props
    return (
      <AnchorContext.Provider
        value={{
          registerLink: this.registerLink,
          unregisterLink: this.unregisterLink,
          activeLink: this.state.activeLink,
        }}
      >
        {affix ? (
          <Sticky top={0}>
            <div style={style} className={classnames(anchorClass('_'), className)} ref={this.cacheDom}>
              <div className={anchorClass('container')}>{children}</div>
            </div>
          </Sticky>
        ) : (
          <div style={style} className={classnames(anchorClass('_'), className)} ref={this.cacheDom}>
            <div className={anchorClass('container')}>{children}</div>
          </div>
        )}
      </AnchorContext.Provider>
    )
  }
}

Anchor.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  target: PropTypes.element,
  affix: PropTypes.bool,
}

export default Anchor
