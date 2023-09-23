import { TouchableOpacity, Text } from 'react-native'
import { useStudy } from '../hooks/useStudy'
import { styles } from '../themes'

export default function StartButton() {
  const study = useStudy()

  return (
    <TouchableOpacity
      style={[{ backgroundColor: '#6009f6' }, styles.container, styles.btn]}
      activeOpacity={0.8}
      onPress={() => {
        study.pause()
      }}
    >
      <Text style={styles.btnText}>{study.isRunning ? 'Pause' : 'Start'}</Text>
    </TouchableOpacity>
  )
}
