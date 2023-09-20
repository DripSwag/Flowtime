import { Button } from 'react-native'
import { useStudy } from '../hooks/useStudy'

export default function FinishButton() {
  const study = useStudy()

  if (!study.isStudy) {
    return <></>
  }

  return <Button title='Finish' onPress={() => study.study()}></Button>
}
