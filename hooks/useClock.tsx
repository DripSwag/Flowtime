import { createContext, useReducer, useContext } from 'react'

interface Clock {
  time: number
  duration: number
}

const initialState = {
  time: 0,
  duration: 0,
}

interface Context {
  time: number
  duration: number
  increment: Function
  decrement: Function
  divide: Function
}

const Context = createContext(initialState)

export default function ClockContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  function reducer(state: Clock, action: string) {
    switch (action) {
      case 'increment':
        return { time: state.time + 1, duration: state.duration }
      case 'decrement':
        return { time: state.time - 1, duration: state.duration }
      case 'divide':
        const dividedTime = Math.floor(state.time / 4)
        return { time: 0, duration: dividedTime }
    }
  }

  const value: Context = {
    time: state.time,
    duration: state.duration,
    increment: () => dispatch('increment'),
    decrement: () => dispatch('decrement'),
    divide: () => dispatch('divide'),
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useClock = () => {
  const context = useContext(Context)

  return context as Context
}
