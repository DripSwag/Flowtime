import { View, Vibration } from 'react-native'
import { useEffect, useState } from 'react'
import { useStudy } from '../hooks/useStudy'
import { useClock } from '../hooks/useClock'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import ClockText from './ClockText'

export default function Clock() {
  const study = useStudy()
  const clock = useClock()
  const [width, setWidth] = useState(180)

  function handleComplete() {
    study.study()
    Vibration.vibrate(1000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (study.isRunning && study.isStudy) {
        clock.increment()
      }
    }, 1000)

    return () => clearInterval(interval)
  })

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onLayout={data => {
        setWidth(data.nativeEvent.layout.width)
      }}
    >
      {!study.isStudy ? (
        <View style={{ position: 'relative' }}>
          <CountdownCircleTimer
            key={0}
            isPlaying={study.isRunning}
            size={width}
            duration={clock.duration}
            rotation='counterclockwise'
            strokeWidth={6}
            //Thing to stop ts throwing error
            colors={['#ffffff', '#ffffff']}
            trailColor='#000000'
            colorsTime={[0, 1]}
            onComplete={handleComplete}
          >
            {({ remainingTime }) => {
              return (
                <View style={{ alignItems: 'center' }}>
                  <ClockText time={remainingTime} />
                </View>
              )
            }}
          </CountdownCircleTimer>
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <ClockText time={clock.time} />
        </View>
      )}
    </View>
  )
}
