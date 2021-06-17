import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ListContext {
	list: Item[];
	updateList(list: Item[]): Promise<void>;

	loading: boolean;
	clearStorage(): Promise<void>;
}

const ListContext = createContext<ListContext>({} as ListContext);

export const ListProvider: React.FC = ({ children }) => {
	const [list, setList] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadList = async () => {
			const list = await AsyncStorage.getItem('@Bist:buyList');

			setList(JSON.parse(list as string));
			setLoading(false);
		}

		loadList();
	}, []);

	const updateList = async (list: Item[]) => {
		setList(list);
		await AsyncStorage.setItem('@Bist:buyList', JSON.stringify(list));
	}


	const clearStorage = async () => {
		setLoading(true)
		await AsyncStorage.setItem('@Bist:buyList', JSON.stringify([]));
		await AsyncStorage.setItem('@Bist:rawValues', JSON.stringify([]));
		setLoading(false)

	}

	return <ListContext.Provider value={{ list, updateList, loading, clearStorage }}>{children}</ListContext.Provider>;

}

export default ListContext
