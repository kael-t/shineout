/**
 * cn - 固定位置
 *    -- 固定在容器中，不随页面滚动而发生变化
 * en - Fixed position
 *    -- Fixed position
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
