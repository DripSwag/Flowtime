import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { AppState, AppStateStatus } from 'react-native'
import useNotification, { TriggerNotification } from './useNotifications'
import { useStudy } from './useStudy'
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Clock {
  time: number
  duration: number
  ratio: number
}

const initialState = {
  time: 0,
  duration: 0,
  ratio: 4,
}

interface Context extends Clock {
  increment: Function
  decrement: Function
  divide: Function
  setTime: Function
  setRatio: Function
}

const Context = createContext(initialState)

export default function ClockContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [closeDate, setCloseDate] = useState<number>()
  const appState = useRef(AppState.currentState)
  const study = useStudy()
  const notifications = useNotification()

  function reducer(
    state: Clock,
    payload: {
      type: string
      addedTime?: number
      newTime?: number
      newRatio?: number
    },
  ) {
    switch (payload.type) {
      case 'increment':
        return {
          time: state.time + 1,
          duration: state.duration,
          ratio: state.ratio,
        }
      case 'decrement':
        return {
          time: state.time - 1,
          duration: state.duration,
          ratio: state.ratio,
        }
      case 'divide':
        const dividedTime = Math.floor(state.time / state.ratio)
        return { time: 0, duration: dividedTime, ratio: state.ratio }
      case 'foreground':
        return {
          time: state.time + payload.addedTime,
          duration: state.duration,
          ratio: state.ratio,
        }
      case 'setTime':
        return {
          time: payload.newTime,
          duration: state.duration,
          ratio: state.ratio,
        }
      case 'setRatio':
        AsyncStorage.setItem('restRatio', String(payload.newRatio))
        return {
          time: state.time,
          duration: state.duration,
          ratio: payload.newRatio,
        }
    }
  }

  function handleAppStateChange(newState: AppStateStatus) {
    //Messy
    //If goint to active
    if (
      appState.current.match(/inactive|background/) &&
      newState === 'active'
    ) {
      if (study.isRunning) {
        Notifications.dismissAllNotificationsAsync()
        Notifications.cancelAllScheduledNotificationsAsync()
      }
      if (study.isRunning && study.isStudy) {
        const timeDifference = Math.ceil((Date.now() - closeDate) / 1000)
        dispatch({ type: 'foreground', addedTime: timeDifference })
      }
      //If going to inactive
    } else {
      if (study.isRunning) {
        TriggerNotification({
          body: 'Your clock is still running',
          trigger: null,
        })
        TriggerNotification({
          body: 'Your rest time has finished',
          trigger: { seconds: state.time },
        })
      }

      if (study.isRunning && study.isStudy) {
        setCloseDate(Date.now())
      }
    }
    appState.current = newState
  }

  async function fetchPersistentData() {
    AsyncStorage.getItem('restRatio').then((value: string) => {
      if (value !== '0') {
        dispatch({ type: 'setRatio', newRatio: Number(value) })
      }
    })
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )

    return () => subscription.remove()
  })

  useEffect(() => {
    fetchPersistentData()
  }, [])

  const value: Context = {
    time: state.time,
    duration: state.duration,
    ratio: state.ratio,
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
    divide: () => dispatch({ type: 'divide' }),
    setTime: (time: number) => dispatch({ type: 'setTime', newTime: time }),
    setRatio: (ratio: number) => {
      dispatch({ type: 'setRatio', newRatio: ratio })
    },
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useClock = () => {
  const context = useContext(Context)

  //For typing
  return context as Context
}
