import React, { useEffect, useState } from 'react'
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'

import { List } from '../screens/List'
import { NewList } from '../screens/NewList'
import { api } from '../services/Api'

const Stack = createStackNavigator()

const Routes = () => {
  const [loading, setLoading] = useState(true)

  const pingApi = async () => {
    await api.get('/')
    setLoading(false)
  }

  useEffect(() => {
    pingApi()
  }, [])

  if (loading) {
    return <AppLoading />
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='List'
        component={List}
        options={{ ...styles, title: 'Listas de compras' }}
      />
      <Stack.Screen
        name='NewList'
        component={NewList}
        options={{ ...styles, title: 'Nova Lista' }}
      />
    </Stack.Navigator>
  )
}

export default Routes

const styles: StackNavigationOptions = {
  headerTitleAlign: 'center'
}
