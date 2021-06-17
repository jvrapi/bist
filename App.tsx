import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { ListProvider } from './src/contexts/';
export default function App() {
	return (
		<NavigationContainer>
			<ListProvider>
				<Routes />
			</ListProvider>
			<StatusBar style="light" />
		</NavigationContainer>

	);
}

