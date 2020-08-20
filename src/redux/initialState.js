import {clone, storage} from '@core/utils';
import {defaultStyles, defaultTableName} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  tableName: defaultTableName,
  date: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultState,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : clone(defaultState)
