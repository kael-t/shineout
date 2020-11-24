import React, { Component } from 'react'
import classnames from 'classnames'
import { anchorClass } from '../styles'
import AnchorContext from './context'

class AnchorLink extends Component {
  static contextType = AnchorContext

  constructor(props) {
    super(props)
    this.node = null
    this.bindNode = this.bindNode.bind(this)
  }

  componentDidMount() {
    this.context.registerLink(this.props.href, this.getNodeTop())
  }

  componentDidUpdate(prevProps) {
    const { href } = this.props
    if (prevProps.href !== href) {
      this.context.unregisterLink(prevProps.href)
      this.context.registerLink(href, this.getNodeTop())
    }
  }

  componentWillUnmount() {
    this.context.unregisterLink(this.props.href)
  }

  onClick(e) {
    console.log('href: ', e)
  }

  getNodeTop() {
    if (!this.node) return 0
    const { top } = this.node.getBoundingClientRect()
    return top
  }

  bindNode(node) {
    this.node = node
  }

  render() {
    const { className, style, title, href, target, children } = this.props

    return (
      <div
        className={classnames(anchorClass('link'), this.context.activeLink === href && 'link-active', className)}
        style={style}
      >
        <a
          ref={this.bindNode}
          className={anchorClass('link-item')}
          title={title}
          href={href}
          target={target}
          onClick={this.onClick}
        >
          {title}
        </a>
        {children}
      </div>
    )
  }
}

AnchorLink.displayName = 'ShineoutAnchorLink'

export default AnchorLink
