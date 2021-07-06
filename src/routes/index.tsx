import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack'
import { List } from '../screens/List'
import { NewList } from '../screens/NewList'

const Stack = createStackNavigator()

const Routes = () => {
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
