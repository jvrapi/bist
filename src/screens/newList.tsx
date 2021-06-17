import { AntDesign } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import NewProduct from '../assets/icons/add-to-basket.svg';
import Loupe from '../assets/icons/loupe.svg';
import Card from '../components/Card';
import ListContext from '../contexts';
import products from '../data/products.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';
interface Product {
	name: string
}

const NewList: React.FC = () => {
	const { list, updateList, loading, clearStorage } = useContext(ListContext)
	const [productsFound, setProductFound] = useState<Product[]>([]);
	const [showInput, setShowInput] = useState(false);
	const [optionSelected, setOptionSelected] = useState(0);
	const [showInputContainer, setShowInputContainer] = useState(true);
	const [buyList, setBuyList] = useState<Item[]>([]);
	const [editingItem, setEditingItem] = useState(0);

	const findProductStyle = inputStyles(productsFound.length > 0);

	const findProducts = (productName: string) => {
		if (productName) {
			if (optionSelected === 0) {
				const productsFound = buyList.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()));
				setBuyList(productsFound);

			} else {
				const productsFound = products.filter(product => product.name.toLowerCase().includes(productName.toLowerCase()));
				setProductFound(productsFound);
			}
		} else {
			setBuyList(list);
			setProductFound([]);
		}
	}

	const addItemToList = async (product: Product) => {
		const item = {
			id: buyList.length + 1,
			name: product.name,
			amount: 1,
			price: '0',
		}
		const updatedList = [...buyList];
		updatedList.push(item);
		setBuyList(updatedList);
		setProductFound([]);
		await updateList(updatedList);

	}

	const increment = (id: number) => {
		const updatedList = buyList.map(item => {
			if (item.id === id) {
				item.amount++;
			}
			return item;
		});
		setBuyList(updatedList);
		updateList(updatedList);
		total(id);

	}
	const decrement = (id: number) => {
		const updatedList = buyList.map(item => {
			if (item.id === id) {
				if (item.amount > 0) {

					item.amount--;
				}


			}
			return item;
		}).filter(item => item.amount > 0);

		setBuyList(updatedList);
		updateList(updatedList);
		total(id);
	}

	const total = (itemId: number) => {
		const item = buyList.filter(item => item.id === itemId).shift() as Item;

		if (item) {
			const total = item.amount * parseFloat(item.price);
			return total;
		}
		return ''
	}

	const updatePrice = (itemId: number, rawValue: string) => {
		const updatedList = buyList.map(item => {
			if (item.id === itemId) {
				item.price = rawValue;

			}
			return item;
		})
		setBuyList(updatedList);
		updateList(updatedList);
		total(itemId);
	}

	const finishBuy = async () => {
		await clearStorage()
	}

	const calculateTotalListValue = () => {
		let totalList = 0;
		buyList.forEach(item => {
			const totalPerItem = total(item.id);
			if (totalPerItem) {
				totalList += totalPerItem;
			}
		})
		return totalList
	}

	useEffect(() => {
		if (!loading) {
			setBuyList(list);
		}

	}, [loading]);

	useEffect(() => {

		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				setEditingItem(0);
			}
		);

		return () => {
			keyboardDidHideListener.remove();
		};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{!loading && <>
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

					<TouchableOpacity onPress={() => finishBuy()}>
						<MaterialCommunityIcons name="playlist-check" size={50} color="black" />
					</TouchableOpacity>

				</View>}

				{showInput && <View style={{ padding: 10 }}>
					<View style={findProductStyle.container}>
						{
							<TouchableOpacity onPress={() => {
								setShowInputContainer(true);
								setShowInput(false);
							}}>
								{optionSelected === 1 ? <NewProduct width='40' height='40' fill='#000000' /> : <Loupe width='30' height='30' fill='#000000' />}
							</TouchableOpacity>
						}
						<TextInput placeholder='Insira o nome do produto' style={findProductStyle.input} onChangeText={(text) => findProducts(text)} />
					</View>
				</View>}

				<View style={buyListStyles.container}>
					<ScrollView style={buyListStyles.scroll}>
						<View style={buyListStyles.content}>
							{buyList.map((item, i) => (

								<Card key={i} style={buyListStyles.card}>

									<TouchableOpacity onPress={() => decrement(item.id)}>
										<AntDesign name="minus" size={24} color="black" />
									</TouchableOpacity>

									<View style={buyListStyles.textContainer}>

										<Text style={buyListStyles.productName}>{item.name}</Text>
										<Text style={buyListStyles.productAmount}>{item.amount}</Text>
										{(editingItem < 1 || editingItem !== item.id) && (
											<TouchableWithoutFeedback onPress={() => setEditingItem(item.id)} style={{ backgroundColor: 'red' }}>
												<Text style={buyListStyles.productTotal}>Total: R${total(item.id)} </Text>
											</TouchableWithoutFeedback>
										)}
										{editingItem === item.id && (
											<TextInputMask
												style={buyListStyles.input}
												type={'money'}
												value={item.price}
												includeRawValueInChangeText
												onChangeText={(maskedValue, rawValue) => {
													updatePrice(item.id, rawValue as string)
												}}
											/>
										)}

									</View>

									<TouchableOpacity onPress={() => increment(item.id)}>
										<AntDesign name="plus" size={24} color="black" />
									</TouchableOpacity>

								</Card>

							))}
						</View>
					</ScrollView>
				</View>

				<View style={styles.totalListContainer}>
					<Text style={styles.totalListText}>
						Total da Lista: <Text style={styles.totalListValueText}>R$ {calculateTotalListValue()}</Text>
					</Text>
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
			</>}
			{loading && <ActivityIndicator size='large' color='#000000' style={styles.loading} />
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
	},

	buttonsContainer: {
		flexDirection: 'row',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: 10,
		padding: 10
	},

	scrollContainer: {
		width: '100%',
		minHeight: 30,
		maxHeight: '40%',
		position: 'absolute',
		top: 60,
		paddingHorizontal: 10,
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

	loading: {
		flex: 1,
	},

	totalListContainer: {
		backgroundColor: '#b9e8b9',
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},

	totalListText: {
		fontSize: 18,
	},
	totalListValueText: {
		fontWeight: 'bold',
		fontSize: 19,
	}

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

		padding: 10,
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
		height: '70%',
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
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 10,
		flexDirection: 'row'
	},

	textContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		height: '100%',
		marginHorizontal: 20
	},

	productName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	productAmount: {
		fontSize: 20,
	},
	productTotal: {
		fontSize: 17
	},

	input: {
		fontSize: 17,
	}
})
