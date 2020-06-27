
export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    subscribe(fn) {
      listeners.push(fn)
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== fn)
        }
      }
    },
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    getState() {
      // для избежания мутирования стэйта
      // (можно использовать только с простыми структурами данных)
      return JSON.parse(JSON.stringify(state))
    }
  }
}

// export class CreateStoreClass {
//   constructor(rootReducer, initialState = {}) {
//     this.state = rootReducer({...initialState}, {type: '__INIT__'})
//     this.listeners = []
//   }
//
//   subscribe(fn) {
//     this.listeners.push(fn)
//     return {
//       unsubscribe() {
//         this.listeners = this.listeners.filter(l => l !== fn)
//       }
//     }
//   }
//
//   dispatch(action) {
//     this.state = rootReducer(this.state, action)
//     this.listeners.forEach(listener => listener(this.state))
//   }
//
//   getState() {
//     return this.state
//   }
// }
