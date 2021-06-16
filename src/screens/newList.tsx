import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native'
import Loupe from '../assets/icons/loupe.svg';
import NewProduct from '../assets/icons/add-to-basket.svg';
import products from '../data/products.json';
import Card from '../components/Card';

interface Product {
	name: string
}

interface Item {
	name: string;
	amount: number;
	price: number;
}

const NewList = () => {
	const [productsFound, setProductFound] = useState<Product[]>([]);
	const [showInput, setShowInput] = useState(false);
	const [optionSelected, setOptionSelected] = useState(0);
	const [showInputContainer, setShowInputContainer] = useState(true);
	const [buyList, setBuyList] = useState<Item[]>([]);

	const findProductStyle = inputStyles(productsFound.length > 0);



	const findProducts = (productName: string) => {
		if (productName) {

			const productsFound = products.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()));
			setProductFound(productsFound);
		} else {
			setProductFound([])
		}
	}

	const addItemToList = (product: Product) => {
		const item = {
			name: product.name,
			amount: 1,
			price: 0,
		}
		const updatedList = [...buyList];
		updatedList.push(item);
		setBuyList(updatedList);
		setProductFound([]);

	}
	return (
		<SafeAreaView style={styles.container}>

			{showInputContainer && <View style={styles.buttonsContainer}>
				<TouchableOpacity onPress={() => {
					setShowInput(true);
					setShowInputContainer(false);
					setOptionSelected(0);

				}}>
					<Loupe width='30' height='30' fill='#000000' />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {
					setShowInput(true);
					setShowInputContainer(false);
					setOptionSelected(1);
				}}>
					<NewProduct width='50' height='50' fill='#000000' />
				</TouchableOpacity>

			</View>}

			{showInput && <View style={findProductStyle.container}>
				{
					<TouchableOpacity onPress={() => {
						setShowInputContainer(true);
						setShowInput(false);
					}}>
						{optionSelected === 1 ? <NewProduct width='40' height='40' fill='#000000' /> : <Loupe width='30' height='30' fill='#000000' />}
					</TouchableOpacity>
				}
				<TextInput placeholder='Insira o nome do produto' style={findProductStyle.input} onChangeText={(text) => findProducts(text)} />
			</View>}

			<View style={buyListStyles.container}>
				<ScrollView style={buyListStyles.scroll}>
					<View style={buyListStyles.content}>
						{buyList.map((item, i) => (

							<Card key={i} style={buyListStyles.card}>
								<Text>{item.name}</Text>
							</Card>

						))}
					</View>
				</ScrollView>
			</View>

			{productsFound.length > 0 &&
				<View style={styles.scrollContainer}>
					<ScrollView style={styles.scroll}>
						{productsFound.map((product, i) => (
							<TouchableOpacity key={i} style={styles.productContainer} onPress={() => addItemToList(product)}>
								<Text key={i}>{product.name}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			}

		</SafeAreaView>
	)
}

export default NewList

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10,
		position: 'absolute',
	},

	buttonsContainer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around'
	},

	scrollContainer: {
		width: '100%',
		minHeight: 30,
		maxHeight: '40%',
		position: 'absolute',
		top: 60,
	},

	scroll: {
		backgroundColor: '#ffffff',
		borderColor: '#000',

		borderBottomRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderRightWidth: 2,

		borderLeftWidth: 2,

		borderBottomStartRadius: 20,
		borderBottomEndRadius: 20,
		borderBottomWidth: 2,
		borderBottomColor: '#000',




	},

	productContainer: {
		padding: 3,
		marginLeft: 10,
		marginBottom: 10,

	},


})

const inputStyles = (hasData: boolean) => StyleSheet.create({
	container: {
		width: '100%',
		borderWidth: 2,
		borderColor: '#000',

		borderBottomStartRadius: hasData ? 0 : 20,
		borderBottomEndRadius: hasData ? 0 : 20,
		borderBottomColor: hasData ? '#ccc' : '#000',

		borderTopEndRadius: 20,
		borderTopStartRadius: 20,



		height: 50,
		flexDirection: 'row',
		paddingHorizontal: 15,
		alignItems: 'center',


	},
	input: {
		flex: 1,
		fontSize: 15,
		marginLeft: 10,

	}
})

const buyListStyles = StyleSheet.create({
	container: {
		marginTop: 40,
		width: '100%',
		height: '50%',
	},

	scroll: {
		width: '100%',
	},

	content: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		alignSelf: 'center',
		paddingHorizontal: 20,

	},

	card: {
		backgroundColor: '#b9e8b9',
		margin: 10,
	}
})
