import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ListContext {
	list: Item[];
	updateList(list: Item[]): Promise<void>;
	rawValues: RawValues[];
	updateRawValues(rawValues: RawValues[]): Promise<void>;
	loading: boolean;
	clearStorage(): Promise<void>;
}

const ListContext = createContext<ListContext>({} as ListContext);

export const ListProvider: React.FC = ({ children }) => {
	const [list, setList] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);
	const [rawValues, setRawValues] = useState<RawValues[]>([])

	useEffect(() => {
		const loadList = async () => {
			const list = await AsyncStorage.getItem('@Bist:buyList');
			const rawValues = await AsyncStorage.getItem('@Bist:rawValues');

			setList(JSON.parse(list as string));
			setRawValues(JSON.parse(rawValues as string));
			setLoading(false);
		}

		loadList();
	}, []);

	const updateList = async (list: Item[]) => {
		setList(list);
		await AsyncStorage.setItem('@Bist:buyList', JSON.stringify(list));
	}
	const updateRawValues = async (rawValues: RawValues[]) => {
		setRawValues(rawValues);
		await AsyncStorage.setItem('@Bist:rawValues', JSON.stringify(rawValues));

	}

	const clearStorage = async () => {
		await AsyncStorage.setItem('@Bist:buyList', JSON.stringify([]));
		await AsyncStorage.setItem('@Bist:rawValues', JSON.stringify([]));

	}

	return <ListContext.Provider value={{ list, updateList, loading, rawValues, updateRawValues, clearStorage }}>{children}</ListContext.Provider>;

}

export default ListContext
