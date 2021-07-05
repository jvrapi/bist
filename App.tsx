import 'react-native-gesture-handler'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import { AppearanceProvider } from 'react-native-appearance'
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold
} from '@expo-google-fonts/rajdhani'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'

import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <AppearanceProvider>
      <NavigationContainer>
        <Routes />
        <StatusBar style='light' />
      </NavigationContainer>
    </AppearanceProvider>
  )
}
