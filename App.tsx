import 'react-native-gesture-handler'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold
} from '@expo-google-fonts/rajdhani'
import { NavigationContainer } from '@react-navigation/native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { AppearanceProvider } from 'react-native-appearance'
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
