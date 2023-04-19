import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsStoreType = {
	isAutoOpenLink: boolean;
	isSaveHistory: boolean;
	isVibration: boolean;
	isFlashlightModeTorch: boolean;
	setIsSaveHistory: () => void;
	setIsAutoOpenLink: () => void;
	setIsVibration: () => void;
	setIsFlashlightModeTorch: () => void;
};

export const useSettingsStore = create<SettingsStoreType>()(
	persist(
		immer((set) => ({
			isAutoOpenLink: false,
			isSaveHistory: true,
			isVibration: true,
			isFlashlightModeTorch: false,

			setIsAutoOpenLink: () =>
				set((state) => {
					state.isAutoOpenLink = !state.isAutoOpenLink;
				}),

			setIsSaveHistory: () =>
				set((state) => {
					state.isSaveHistory = !state.isSaveHistory;
				}),

			setIsVibration: () =>
				set((state) => {
					state.isVibration = !state.isVibration;
				}),

			setIsFlashlightModeTorch: () =>
				set((state) => {
					state.isFlashlightModeTorch = !state.isFlashlightModeTorch;
				})
		})),

		{
			name: '@scanni:settings',
			storage: createJSONStorage(() => AsyncStorage)
		}
	)
);
