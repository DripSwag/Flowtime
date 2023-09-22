import { View } from 'react-native'
import { useEffect } from 'react'
import { useStudy } from '../hooks/useStudy'
import StudyLabel from './StudyLabel'
import { useClock } from '../hooks/useClock'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import ClockText from './ClockText'

export default function Clock() {
  const study = useStudy()
  const clock = useClock()

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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!study.isStudy ? (
        <View style={{ position: 'relative' }}>
          <CountdownCircleTimer
            key={0}
            isPlaying={study.isRunning}
            duration={clock.duration}
            rotation='counterclockwise'
            strokeWidth={6}
            //Thing to stop ts throwing error
            colors={['#ffffff', '#ffffff']}
            trailColor='#000000'
            colorsTime={[0, 1]}
            onComplete={() => {
              study.study()
            }}
          >
            {({ remainingTime }) => {
              return (
                <View style={{ alignItems: 'center' }}>
                  <ClockText time={remainingTime} />
                  <StudyLabel />
                </View>
              )
            }}
          </CountdownCircleTimer>
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <ClockText time={clock.time} />
          <StudyLabel />
        </View>
      )}
    </View>
  )
}
