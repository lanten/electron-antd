import React from 'react'
import renderer from 'react-test-renderer'

import App from '../app'
import { DEFAULT_CREATE_CONFIG } from '@/core/tools/consts'

test('Renderer: App', () => {
  const component = renderer.create(<App createConfig={DEFAULT_CREATE_CONFIG} />)

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

// TODO 需要 babel-loader
