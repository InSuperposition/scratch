import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {NAME as name} from './constants.js'
import reducers from './reducers.js'
import {fetchCount} from './thunks.js'

const initialState = {
  value: 0
}

// async actions
export const asyncCount = createAsyncThunk(
  `${name}/asyncCount`,
  async function fetchCountThunk(value, thunkAPI) {
    // README: do most Redux and thunk specific operations here to reduce coupling
    // https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator

    // use sync actions created by `createSlice`?
    // TODO: but is it a good idea? probably best to avoid in most cases
    // const {dispatch, getStore} = thunkAPI
    // dispatch(increment())
    return fetchCount(value)
  }
)

export const counterSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: {
    // shared logic
    [asyncCount.fulfilled]: reducers.incrementByAmount
  }
})

// sync actions
export const {increment, decrement, incrementByAmount} = counterSlice.actions

export default counterSlice.reducer
