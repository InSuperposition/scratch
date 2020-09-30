import {createAsyncThunk} from '@reduxjs/toolkit'
import {NAME} from './constants.js'
import {fetchCount} from './async.js'

export const fetchCountThunk = createAsyncThunk(
  `${NAME}/asyncCount`,
  async function fetchCountThunk(value, thunkAPI) {

    // README: do most Redux and thunk specific operations here to reduce coupling
    // https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
    const data = await fetchCount(value)
    // const resolvedResponse = await apiCallPromise( .. )
    // more await ...

    // use sync actions created by `createSlice`?
    // TODO: but is it a good idea? probably best to avoid in most cases
    // const {dispatch, getStore} = thunkAPI
    // dispatch(increment())

    return data
  }
)

export default {
  fetchCountThunk
}