import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ListContext {
	list: Item[];
	updateList(list: Item[]): Promise<void>;
	loading: boolean;
}

const ListContext = createContext<ListContext>({} as ListContext);

export const ListProvider: React.FC = ({ children }) => {
	const [list, setList] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadList = async () => {
			const list = await AsyncStorage.getItem('@Bist:buyList');
			if (list) {
				setList(JSON.parse(list));
			}
			setLoading(false);
		}

		loadList();
	}, []);

	const updateList = async (list: Item[]) => {
		setList(list);
		await AsyncStorage.setItem('@Bist:buyList', JSON.stringify(list));

	}

	return <ListContext.Provider value={{ list, updateList, loading }}>{children}</ListContext.Provider>;

}

export default ListContext
