import React from 'react'
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native'
import Items from './data/items.json';
import Card from './components/Card';

const List = () => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scroll}>
				<Card>
					{Items.map((item, i) => (
						<Text key={i}>{item.name}</Text>
					))}
				</Card>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffff'
	},
	scroll: {
		marginTop: 100,
	}

})

export default List
