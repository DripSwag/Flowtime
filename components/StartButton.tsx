import { Button } from 'react-native'
import { useStudy } from '../hooks/useStudy'

export default function StartButton() {
  const study = useStudy()

  return (
    <Button
      title={study.isRunning ? 'Pause' : 'Start'}
      onPress={() => {
        study.pause()
      }}
    ></Button>
  )
}
