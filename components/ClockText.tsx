import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { useStudy } from '../hooks/useStudy'
import { styles } from '../themes'
import StudyLabel from './StudyLabel'

interface Params {
  time: number
}

const opacityConfig = {
  easing: Easing.out(Easing.cubic),
}

const fontSizeConfig = {
  easing: Easing.in(Easing.cubic),
}

export default function ClockText({ time }: Params) {
  const study = useStudy()

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: study.isRunning
      ? withTiming(1, opacityConfig)
      : withTiming(0.8, opacityConfig),
    fontSize: study.isRunning
      ? withTiming(64, fontSizeConfig)
      : withTiming(50, fontSizeConfig),
  }))

  return (
    <View style={{ alignItems: 'center' }}>
      <Animated.Text
        style={[
          styles.text,
          { fontSize: 64, fontWeight: '500' },
          animatedStyle,
        ]}
      >
        {`${Math.floor(time / 60) < 10 ? '0' : ''}${Math.floor(time / 60)}:${
          time % 60 < 10 ? '0' : ''
        }${(time % 60).toString()}`}
      </Animated.Text>
      <StudyLabel />
    </View>
  )
}
