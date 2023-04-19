import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ScanStoreType = {
	isScanned: boolean;
	setIsScanned: (payload: boolean) => void;
};

export const useScanStore = create<ScanStoreType>()(
	immer((set) => ({
		isScanned: false,

		setIsScanned: (payload) =>
			set((state) => {
				state.isScanned = payload;
			})
	}))
);
