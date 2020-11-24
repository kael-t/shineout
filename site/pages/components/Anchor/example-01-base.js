/**
 * cn - 基本用法
 *    -- 基本的使用
 * en - Base
 *    -- Basic usage
 */
import React from 'react'
import { Anchor } from 'shineout'

export default function() {
  return (
    <Anchor>
      <Anchor.Link className="so-anchor-link-active" title="Base" href="#heading-01-base" />
      <Anchor.Link title="Affix" href="#heading-02-affix" />
      <Anchor.Link title="onClick" href="#heading-03-onclick" />
      <Anchor.Link title="onChange" href="#heading-04-onchange" />
    </Anchor>
  )
}
