import React from 'react'
import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native'
import BuyLists from './data/lists.json';
import Card from './components/Card';
import { numberToReal } from './assets/functions';

interface Items {
	price: number;
	amount: number;

}

const List = () => {
	const totalList = (items: Items[]) => {

		let total = 0;
		items.forEach(item => {
			const sum = item.price * item.amount
			total += sum;
		})
		return numberToReal(total)
	}


	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.scrollContainer}>
				<ScrollView style={styles.scroll}>
					<Card style={styles.card}>
						{BuyLists.map((list, i) => (
							<View key={i} style={styles.cardContent}>
								<Text style={[styles.text, styles.strong]}>{list.name}</Text>
								<Text style={[styles.text, styles.strong]}>
									Total: {totalList(list.items)}
								</Text>
							</View>
						))}
					</Card>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f1f1f1'
	},
	scrollContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '71%',

	},
	scroll: {
		width: '100%',
		padding: 10,
	},

	card: {
		backgroundColor: '#b9e8b9'
	},

	cardContent: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: "column",
		height: "100%",
		paddingVertical: 10
	},

	text: {
		fontSize: 16
	},

	strong: {
		fontWeight: 'bold',
	}

})

export default List
