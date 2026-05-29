import { combineReducers } from '@reduxjs/toolkit'
import { dataReducer } from './data-reducer/data-slice'
import { filterReducer } from './filter-reducer/filter-slice'

export const rootReducer = combineReducers({
  data: dataReducer,
  filter: filterReducer
})

export type RootState = ReturnType<typeof rootReducer>
