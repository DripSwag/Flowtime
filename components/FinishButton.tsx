import { Button } from 'react-native'
import { useClock } from '../hooks/useClock'
import { useStudy } from '../hooks/useStudy'

export default function FinishButton() {
  const study = useStudy()
  const clock = useClock()

  function handleClick() {
    clock.divide()
    study.study()
  }

  if (!study.isStudy) {
    return <></>
  }

  return <Button title='Finish' onPress={handleClick}></Button>
}
