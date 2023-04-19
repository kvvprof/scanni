import { HistoryType } from '../types/historyType';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { immer } from 'zustand/middleware/immer';

type HistoryStoreType = {
	history: HistoryType[];
	currentHistory: HistoryType | null;
	addHistory: (payload: HistoryType) => void;
	setCurrentHistory: (payload: HistoryType | null) => void;
	clearHistory: () => void;
};

export const useHistoryStore = create<HistoryStoreType>()(
	persist(
		immer((set) => ({
			history: [],
			currentHistory: null,

			addHistory: (payload) =>
				set((state) => {
					if (state.history.length > 99) {
						state.history.pop();
					}
					state.history.unshift(payload);
				}),

			setCurrentHistory: (payload) =>
				set((state) => {
					state.currentHistory = payload;
				}),

			clearHistory: () =>
				set((state) => {
					state.history = [];
				})
		})),

		{
			name: '@scanni:history',
			storage: createJSONStorage(() => AsyncStorage)
		}
	)
);
