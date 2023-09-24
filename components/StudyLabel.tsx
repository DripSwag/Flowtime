import { Text } from 'react-native'
import { useStudy } from '../hooks/useStudy'
import { styles } from '../themes'

export default function StudyLabel() {
  const study = useStudy()

  return (
    <Text style={[styles.text, { fontSize: 12 }]}>
      {study.isStudy ? 'Studying' : 'Break'}
    </Text>
  )
}
