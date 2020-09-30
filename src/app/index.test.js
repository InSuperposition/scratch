import React from 'react'
import {render} from '@testing-library/react'
import {Provider} from 'react-redux'
import store from './config/store.js'
import App from './index.js'

// https://stackoverflow.com/a/60974039/1402195
// FIXME: move to mocks folder
const mutationObserverMock = jest.fn(function MutationObserver(callback) {
  this.observe = jest.fn()
  this.disconnect = jest.fn()
  // Optionally add a trigger() method to manually trigger a change
  this.trigger = (mockedMutationsList) => {
    callback(mockedMutationsList, this)
  }
})
global.MutationObserver = mutationObserverMock


test('renders learn react link', () => {
  const {getByText} = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(getByText(/learn/i)).toBeInTheDocument()
})
