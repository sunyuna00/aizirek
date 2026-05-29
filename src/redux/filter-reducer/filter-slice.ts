import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SortByPrice {
  expansive = 'price',
  cheap = '-price',
  default = '',
}

interface IFilter {
  activeCatalog: string
  byPrice: SortByPrice 
  searchName: string,
  searchCount: string,
}

const FilterInitState: IFilter = {
  activeCatalog: '',
  byPrice: SortByPrice.default,
  searchName: '',
  searchCount: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: FilterInitState,
  reducers: {
    selectCatalog: (state, { payload }: PayloadAction<string>) => {
      state.activeCatalog = payload
    },
    changeByPrice: (state, { payload }: PayloadAction<SortByPrice>) => {
      state.byPrice = payload
    },
    changeSearchName: (state, { payload }: PayloadAction<string>) => {
      state.searchName = payload
    },
    changeSearchCount: (state, { payload }: PayloadAction<string>) => {
      state.searchCount = payload
    },
    reset: (state) => {
      state.activeCatalog = FilterInitState.activeCatalog
      state.byPrice = FilterInitState.byPrice
      state.searchCount = FilterInitState.searchCount
      state.searchName = FilterInitState.searchName
    }
  },
})

export const { selectCatalog, changeByPrice, changeSearchCount, changeSearchName, reset } = filterSlice.actions
export const { reducer: filterReducer } = filterSlice
