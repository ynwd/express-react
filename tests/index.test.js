import React from 'react'
import { App } from '../src/public/index'
import { mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('The main app', () => {
  it('the app should have text', () => {
    const app = mount(<App />)
    expect(app.contains(<div>Hello world! This is react-express app.</div>)).toBe(true)
  })
})
