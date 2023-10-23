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
import Cog from './Svg/Cog'
import { useState } from 'react'
import SettingsModal from './components/SettingsModal'

//https://realtimecolors.com/?colors=f7f5f9-020203-6009f6-191d11-5aa097

export default function App() {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <StudyContext>
      <ClockContext>
        <SettingsModal
          visible={modalVisible}
          hideModal={() => setModalVisible(false)}
        />
        <SafeAreaView style={[styles.container, styles.background]}>
          <View style={[styles.container, styles.spaceBetween, styles.hero]}>
            <StatusBar
              barStyle='default'
              backgroundColor={'#000000'}
            ></StatusBar>
            <Cog enableModal={() => setModalVisible(true)} />
            <View style={styles.clock}>
              <Clock />
            </View>
            <View style={[styles.horizontal]}>
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
    paddingVertical: 16,
  },
  background: {
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  clock: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxHeight: 300,
    flexGrow: 1,
    maxWidth: 300,
  },
  horizontal: {
    flexDirection: 'row',
    gap: 16,
  },
})
