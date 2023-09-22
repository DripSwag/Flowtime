import { useReducer, createContext, useContext } from 'react'

interface Clock {
  isRunning: boolean
  isStudy: boolean
}

function reducer(state: Clock, action: string) {
  switch (action) {
    case 'pause':
      return { isRunning: !state.isRunning, isStudy: state.isStudy }
    case 'study':
      return { isRunning: false, isStudy: !state.isStudy }
  }
}

const initialState = {
  isRunning: false,
  isStudy: true,
}

const Context = createContext(initialState)

interface Context {
  isRunning: boolean
  isStudy: boolean
  pause: Function
  study: Function
}

export default function StudyContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value: Context = {
    isRunning: state.isRunning,
    isStudy: state.isStudy,
    pause: () => dispatch('pause'),
    study: () => dispatch('study'),
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useStudy = () => {
  const context = useContext(Context)

  return context as Context
}
