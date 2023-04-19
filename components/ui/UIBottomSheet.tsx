import React, { useCallback, useRef, useMemo, ReactNode, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

type UIBottomSheetPropsType = {
	children?: ReactNode;
	initialPoint?: number;
	onClose?: () => void;
};

export const UIBottomSheet = (props: UIBottomSheetPropsType) => {
	const { children, initialPoint = 1, onClose } = props;
	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => [1, '100%'], []);
	const [currentIndex, setCurrentIndex] = useState<number>(initialPoint);

	const closeBottomSheet = useCallback(() => {
		onClose && onClose();
		sheetRef.current?.close();
	}, []);

	useEffect(() => {
		if (currentIndex === 0) closeBottomSheet();
	}, [currentIndex]);

	return (
		<View style={styles.wrapper}>
			<BottomSheet
				backgroundStyle={{ borderRadius: 20 }}
				ref={sheetRef}
				snapPoints={snapPoints}
				index={initialPoint}
				onChange={(index) => setCurrentIndex(index)}>
				<BottomSheetView>{children}</BottomSheetView>
			</BottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingTop: 200,
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});
