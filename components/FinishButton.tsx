import { Text, TouchableOpacity } from 'react-native'
import { useClock } from '../hooks/useClock'
import { useStudy } from '../hooks/useStudy'
import { ToastAndroid } from 'react-native'
import { styles } from '../themes'

export default function FinishButton() {
  const study = useStudy()
  const clock = useClock()

  function handleClick() {
    if (clock.time / clock.ratio >= 1) {
      clock.divide()
      study.study()
    } else {
      ToastAndroid.show("You haven't studied enough!", ToastAndroid.SHORT)
    }
  }

  if (!study.isStudy) {
    return <></>
  }

  return (
    <TouchableOpacity
      onPress={handleClick}
      style={[{ backgroundColor: '#2c2c2c' }, styles.container, styles.btn]}
      activeOpacity={0.8}
    >
      <Text style={styles.btnText}>Finish</Text>
    </TouchableOpacity>
  )
}
