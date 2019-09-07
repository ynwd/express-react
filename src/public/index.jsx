import React from 'react'
import { render } from 'react-dom'

export const App = () => {
  return <div>Hello world! This is react-express app.</div>
}

render(<App/>, document.getElementById('root') ||
  document.createElement('div')
)
