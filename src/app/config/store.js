import {configureStore} from '@reduxjs/toolkit'
import counter from '../../entities/counter'

export default configureStore({
  reducer: {
    counter
  }
})
