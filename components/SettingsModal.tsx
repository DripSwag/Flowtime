import { useEffect, useState } from 'react'
import { Modal, Text, View, Pressable, TextInput } from 'react-native'
import { useClock } from '../hooks/useClock'

interface Params {
  visible: boolean
  hideModal: Function
}

export default function SettingsModal({ visible, hideModal }: Params) {
  const clock = useClock()
  const [value, setValue] = useState<string>('')

  function handlePress() {
    saveValue()
    hideModal()
  }

  function saveValue() {
    if (value !== '0') {
      clock.setRatio(Number(value))
    }
  }

  function handleTextChange(text: string) {
    const parsedText = text.replace(/([^0-9.])/g, '')
    const periodCount = (parsedText.match(/[.]/g) || []).length
    if (periodCount <= 1) {
      setValue(parsedText)
    }
  }

  useEffect(() => {
    if (visible) {
      setValue(String(clock.ratio))
    }
  }, [visible])

  return (
    <Modal animationType='fade' transparent={true} visible={visible}>
      <View
        style={{
          backgroundColor: '#aaaaaa30',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '50%',
            minHeight: 200,
            backgroundColor: 'black',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}
        >
          <Pressable
            onPress={handlePress}
            style={{ position: 'absolute', margin: 16, left: 0, top: 0 }}
          >
            <Text style={{ color: 'white' }}>X</Text>
          </Pressable>
          <View style={{ width: '100%', minHeight: 'auto' }}>
            <Text style={{ color: 'white' }}>Rest time ratio</Text>
            <TextInput
              value={value.toString()}
              onChangeText={handleTextChange}
              placeholderTextColor={'gray'}
              keyboardType='decimal-pad'
              onEndEditing={saveValue}
              style={{
                height: 64,
                width: '100%',
                borderBottomWidth: 2,
                borderColor: 'gray',
                color: 'white',
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
