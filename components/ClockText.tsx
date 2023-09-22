import { Text } from 'react-native'
import { styles } from '../themes'

interface Params {
  time: number
}

export default function ClockText({ time }: Params) {
  return (
    <Text style={[styles.text, { fontSize: 48, fontWeight: '600' }]}>
      {`${Math.floor(time / 60) < 10 ? '0' : ''}${Math.floor(time / 60)}:${
        time % 60 < 10 ? '0' : ''
      }${(time % 60).toString()}`}
    </Text>
  )
}
