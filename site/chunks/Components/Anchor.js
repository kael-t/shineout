/**
 * 此文件根据 scripts/components-page.ejs 生成，不要手动修改
 */
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/locate'

import cn from 'doc/pages/components/Anchor/cn.md'
import en from 'doc/pages/components/Anchor/en.md'

const source = locate(cn, en)

const examples = [
  {
    name: '01-base',
    title: locate(
      '基本用法 \n 基本的使用',
      'Base \n Basic usage'
    ),
    component: require('doc/pages/components/Anchor/example-01-base.js').default,
    rawText: require('!raw-loader!doc/pages/components/Anchor/example-01-base.js'),
  },
  {
    name: '02-affix',
    title: locate(
      '固定位置 \n 固定在容器中，不随页面滚动而发生变化',
      'Fixed position \n Fixed position'
    ),
    component: require('doc/pages/components/Anchor/example-02-affix.js').default,
    rawText: require('!raw-loader!doc/pages/components/Anchor/example-02-affix.js'),
  },
  {
    name: '03-onclick',
    title: locate(
      '自定义Link的点击事件 \n 自定义Link的点击事件',
      'Custom onClick event \n Custom link click event'
    ),
    component: require('doc/pages/components/Anchor/example-03-onclick.js').default,
    rawText: require('!raw-loader!doc/pages/components/Anchor/example-03-onclick.js'),
  },
  {
    name: '04-onchange',
    title: locate(
      '监听锚点变化 \n 监听锚点链接改变',
      'Monitor anchor changes \n Monitor anchor changes'
    ),
    component: require('doc/pages/components/Anchor/example-04-onchange.js').default,
    rawText: require('!raw-loader!doc/pages/components/Anchor/example-04-onchange.js'),
  },
]

const codes = undefined

export default navable(props => (
  <MarkDown {...props} codes={codes} source={source} examples={examples} />
))
