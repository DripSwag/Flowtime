import { Button } from 'react-native'
import { useClock } from '../hooks/useClock'
import { useStudy } from '../hooks/useStudy'
import { ToastAndroid } from 'react-native'

export default function FinishButton() {
  const study = useStudy()
  const clock = useClock()

  function handleClick() {
    if (clock.time > 3) {
      clock.divide()
      study.study()
    } else {
      ToastAndroid.show("You haven't studied enough!", ToastAndroid.SHORT)
    }
  }

  if (!study.isStudy) {
    return <></>
  }

  return <Button title='Finish' onPress={handleClick}></Button>
}
