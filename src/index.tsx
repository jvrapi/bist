import React from 'react'
import { SafeAreaView, Text, StyleSheet, ScrollView, View, Touchable, TouchableOpacity } from 'react-native'
import BuyLists from './data/lists.json';
import Card from './components/Card';
import { numberToReal } from './assets/functions';
import AddListIcon from './assets/icons/add-list.svg'
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
					<View style={styles.scrollContent}>
						{BuyLists.map((list, i) => (
							<Card style={styles.card}>
								<View style={styles.cardContent}>
									<Text style={[styles.text, styles.strong]}>{list.name}</Text>
									<Text style={[styles.text, styles.strong]}>
										Total: {totalList(list.items)}
									</Text>
								</View>
							</Card>
						))}
					</View>

				</ScrollView>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button}>
						<AddListIcon width='60' height='60' fill="#000000" />
					</TouchableOpacity>
				</View>
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
		height: '70%',

	},
	scroll: {
		width: '100%',
	},

	scrollContent: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',

	},

	card: {
		backgroundColor: '#b9e8b9',
		margin: 10,
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
	},

	buttonContainer: {
		alignItems: 'center',
		position: 'absolute',
		borderColor: "green",
		borderWidth: 3,
		borderRadius: 70,
		textAlign: 'center',
		justifyContent: 'center',
		bottom: -110,
		right: 140,
	},
	button: {
		height: 100,
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},

})

export default List
