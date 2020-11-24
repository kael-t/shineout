/**
 * cn - 监听锚点变化
 *    -- 监听锚点链接改变
 * en - Monitor anchor changes
 *    -- Monitor anchor changes
 */
import React from 'react'
import { Anchor } from 'shineout'

export default function() {
  return (
    <Anchor>
      <Anchor.Link title="test link" href="#heading-01-base" />
    </Anchor>
  )
}
