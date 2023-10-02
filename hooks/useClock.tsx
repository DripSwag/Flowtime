import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { useStudy } from './useStudy'

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
  const [closeDate, setCloseDate] = useState<number>()
  const appState = useRef(AppState.currentState)
  const study = useStudy()

  function reducer(
    state: Clock,
    payload: { type: string; addedTime?: number },
  ) {
    switch (payload.type) {
      case 'increment':
        return { time: state.time + 1, duration: state.duration }
      case 'decrement':
        return { time: state.time - 1, duration: state.duration }
      case 'divide':
        const dividedTime = Math.floor(state.time / 4)
        return { time: 0, duration: dividedTime }
      case 'foreground':
        return {
          time: state.time + payload.addedTime,
          duration: state.duration,
        }
    }
  }

  function handleAppStateChange(state: AppStateStatus) {
    if (appState.current.match(/inactive|background/) && state === 'active') {
      if (study.isRunning && study.isStudy) {
        const timeDifference = Math.ceil((Date.now() - closeDate) / 1000)
        dispatch({ type: 'foreground', addedTime: timeDifference })
      }
    } else {
      if (study.isRunning && study.isStudy) {
        setCloseDate(Date.now())
      }
    }
    appState.current = state
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )
    return () => subscription.remove()
  })

  const value: Context = {
    time: state.time,
    duration: state.duration,
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
    divide: () => dispatch({ type: 'divide' }),
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useClock = () => {
  const context = useContext(Context)

  //For typing
  return context as Context
}
