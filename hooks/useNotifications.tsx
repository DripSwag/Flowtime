import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'
import { Platform } from 'expo-modules-core'

async function requestNotificationPermission() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FFFFFF',
    })
  }

  await Notifications.requestPermissionsAsync()
}

export default function useNotification() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  })

  useEffect(() => {
    requestNotificationPermission()
  }, [])
}

interface NotificationPayload {
  body: string
  trigger: Notifications.NotificationTriggerInput
}

export async function TriggerNotification(payload: NotificationPayload) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Flowtime',
      body: payload.body,
    },
    trigger: payload.trigger,
  })
}
