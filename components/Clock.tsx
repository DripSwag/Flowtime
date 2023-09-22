import { Text, View } from 'react-native'
import { useEffect } from 'react'
import { useStudy } from '../hooks/useStudy'
import { styles } from '../themes'
import StudyLabel from './StudyLabel'
import { useClock } from '../hooks/useClock'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

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
                  <Text style={styles.text}>
                    {`${
                      Math.floor(remainingTime / 60) < 10 ? '0' : ''
                    }${Math.floor(remainingTime / 60)}:${
                      remainingTime % 60 < 10 ? '0' : ''
                    }${(remainingTime % 60).toString()}`}
                  </Text>
                  <StudyLabel />
                </View>
              )
            }}
          </CountdownCircleTimer>
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>
            {`${Math.floor(clock.time / 60) < 10 ? '0' : ''}${Math.floor(
              clock.time / 60,
            )}:${clock.time % 60 < 10 ? '0' : ''}${(
              clock.time % 60
            ).toString()}`}
          </Text>
          <StudyLabel />
        </View>
      )}
    </View>
  )
}
