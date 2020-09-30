
import {createSlice} from '@reduxjs/toolkit'
import {NAME as name} from './constants.js'
import reducers from './reducers.js'
import {fetchCountThunk} from './thunks.js'

export * from './selectors.js'

// export for tests
export const initialState = {
  value: 0
}

// createSlice in Redux toolkit creates action creators and actions according to Flux Standard Action(FSA) convention
// https://redux-toolkit.js.org/api/createSlice
const {actions, reducer} = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: {
    // shared logic
    [fetchCountThunk.fulfilled]: reducers.incrementByAmount
    // [fetchCountThunk.rejected]: reducers.doSomething
    // [fetchCountThunk.pending]: reducers.wait

    // TODO:
    // listen for other redux actions from other entites/features
  }
})

export const {decrement, increment, incrementByAmount} = actions
export {fetchCountThunk}
/* 
  ...Epics? 
  ...Sagas? 
  Async all the things!!*/

export default reducer

// can fallback to `createAction` for FSA and `createReducer` or implement boilerplate
// https://redux-toolkit.js.org/api/createAction
