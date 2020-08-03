import {storage} from '@core/utils';
import {defaultStyles, defaultTableName} from '@/constants';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  tableName: defaultTableName
}

const normalize = state => ({
  ...state,
  currentText: ''
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
