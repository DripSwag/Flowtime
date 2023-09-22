import {
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'
import Clock from './components/Clock'
import StartButton from './components/StartButton'
import FinishButton from './components/FinishButton'
import StudyContext from './hooks/useStudy'
import ClockContext from './hooks/useClock'

export default function App() {
  return (
    <StudyContext>
      <ClockContext>
        <SafeAreaView style={[styles.container, styles.background]}>
          <View style={[styles.container, styles.spaceBetween, styles.hero]}>
            <StatusBar barStyle='default'></StatusBar>
            <View style={styles.clock}>
              <Clock />
            </View>
            <View style={styles.horizontal}>
              <StartButton />
              <FinishButton />
            </View>
          </View>
        </SafeAreaView>
      </ClockContext>
    </StudyContext>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  hero: {
    paddingVertical: 12,
  },
  background: {
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  clock: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxHeight: 200,
    flexGrow: 1,
    maxWidth: 200,
  },
  horizontal: {
    flexDirection: 'row',
    gap: 4,
  },
})
