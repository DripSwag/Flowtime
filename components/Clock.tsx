import { Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { useStudy } from '../hooks/useStudy'
import { styles } from '../themes'
import { Svg, Circle, G } from 'react-native-svg'
import StudyLabel from './StudyLabel'
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

//ITS NOT A HOOK, WTF WHY??????
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function Clock() {
  const [time, setTime] = useState(0)
  const [divided, setDivided] = useState(false)
  const [duration, setDuration] = useState(0)
  const [dimensions, setDimensions] = useState<{
    height: number
    width: number
  }>({ height: 0, width: 0 })
  const study = useStudy()
  const percentage = useSharedValue(0)

  const animatedProp = useAnimatedProps(() => ({
    strokeDashoffset: withTiming(percentage.value, {
      duration: 1000,
      easing: Easing.inOut(Easing.linear),
    }),
  }))

  useEffect(() => {
    const interval = setInterval(() => {
      if (study.isRunning && study.isStudy) {
        console.log(2 * Math.PI * (dimensions.width / 2 - 8))
        setTime(time + 1)
      } else if (!study.isStudy && study.isRunning && time > 0) {
        setTime(time - 1)
        percentage.value = withTiming(
          2 *
            Math.PI *
            (dimensions.width / 2 - 8) *
            ((duration - time + 1) / duration),
        )
      } else if (!study.isStudy && study.isRunning && time === 0) {
        study.study()
        setDivided(false)
      }
    }, 1000)

    if (!study.isStudy && !divided) {
      setTime(Math.floor(time / 4))
      setTime(5)
      //setDuration(Math.floor(time / 4))
      setDuration(5)
      percentage.value = 0
      setDivided(true)
    }

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
      onLayout={event => {
        const temp = event.nativeEvent.layout
        setDimensions({ height: temp.height, width: temp.width })
      }}
    >
      <Svg style={{ position: 'absolute' }}>
        <G
          rotation={-90}
          originX={(dimensions.width / 2).toString() || ''}
          originY={(dimensions.height / 2).toString() || '0'}
        >
          <AnimatedCircle
            r={(dimensions.width / 2 - 8).toString() || '0'}
            cx='50%'
            cy='50%'
            fill='transparent'
            stroke='white'
            strokeWidth='8'
            strokeDasharray={2 * Math.PI * (dimensions.width / 2 - 8)}
            animatedProps={animatedProp}
          />
        </G>
      </Svg>
      <Text style={styles.text}>{`${
        Math.floor(time / 60) < 10 ? '0' : ''
      }${Math.floor(time / 60)}:${time % 60 < 10 ? '0' : ''}${(
        time % 60
      ).toString()}`}</Text>
      <StudyLabel />
    </View>
  )
}
