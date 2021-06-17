import React from 'react'
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import List from '../screens/list';
import NewList from '../screens/newList';

const Stack = createStackNavigator();

const Routes = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="NewList" component={NewList} options={{ ...styles, title: 'Nova Lista' }} />
			<Stack.Screen name="List" component={List} options={{ ...styles, title: 'Listas de compras' }} />
		</Stack.Navigator>
	)
}

export default Routes;

const styles: StackNavigationOptions = {
	headerTitleAlign: 'center'
}

