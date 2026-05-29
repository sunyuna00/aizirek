import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Catalog {
  key: string;
  name: string;
  root: string;
}

export interface Nomenclature {
  key: string,
  catalog: string,
  name: string,
  description: string,
  price: number,
  quantity: number,
  brand: string
}

export interface DataJson {
  catalogs: Catalog[];
  nomenclatures: Nomenclature[]
}

const DataInitState: DataJson = {
  catalogs: [],
  nomenclatures: []
}

export const dataSlice = createSlice({
  name: 'data',
  initialState: DataInitState,
  reducers: {
    uploadData: (state, { payload }: PayloadAction<DataJson>) => {
      state.catalogs = payload.catalogs
      state.nomenclatures = payload.nomenclatures
    },
    updateItem: (state, { payload }: PayloadAction<Nomenclature>) => {
      const findIdx = state.nomenclatures.findIndex((el) => el.key === payload.key)
      if (findIdx !== -1) {
        state.nomenclatures[findIdx] = payload
      }
    },
    addItem: (state, { payload }: PayloadAction<Nomenclature>) => {
      state.nomenclatures = [...state.nomenclatures, payload]
    },
    addCatalog: (state, { payload }: PayloadAction<Catalog>) => {
      state.catalogs = [...state.catalogs, payload]
    },
    deleteItem: (state, { payload }: PayloadAction<Nomenclature>) => {
      const findIdx = state.nomenclatures.findIndex((el) => el.key === payload.key)
      if (findIdx !== -1) {
        state.nomenclatures.splice(findIdx, 1)
      }
    },
    resetData: (state) => {
      state.catalogs = []
      state.nomenclatures = []
    },
  },
})

export const { uploadData, deleteItem, updateItem, addItem, addCatalog, resetData } = dataSlice.actions
export const { reducer: dataReducer } = dataSlice
