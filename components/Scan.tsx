import { BarCodeScanner } from 'expo-barcode-scanner';
import { PropsWithChildren, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, Vibration, View } from 'react-native';
import uuid from 'react-native-uuid';
import { HistoryType } from '../types/historyType';
import { domainNameExtractor } from '../utils/domainNameExtractor';
import { useHistoryStore } from '../stores/historyStore';
import { UIButton } from './ui/UIButton';
import { BottomSheet } from './BottomSheet';
import { useSettingsStore } from '../stores/settingsStore';
import * as Linking from 'expo-linking';
import { validateURL } from '../utils/validateUrl';
import { useScanStore } from '../stores/scanStore';
import { Camera, FlashMode } from 'expo-camera';
import { UIText } from './ui/UIText';

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<View style={styles.wrapper}>
			<View style={styles.container}>{children}</View>
		</View>
	);
};

export const Scan = () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const [newHistory, setNewHistory] = useState<HistoryType | null>(null);
	const isScanned = useScanStore((state) => state.isScanned);
	const setIsScanned = useScanStore((state) => state.setIsScanned);
	const addHistory = useHistoryStore((state) => state.addHistory);
	const isAutoOpenLink = useSettingsStore((state) => state.isAutoOpenLink);
	const isSaveHistory = useSettingsStore((state) => state.isSaveHistory);
	const isVibration = useSettingsStore((state) => state.isVibration);
	const isFlashlightModeTorch = useSettingsStore((state) => state.isFlashlightModeTorch);

	const getBarCodeScannerPermissions = async () => {
		const { status } = await BarCodeScanner.requestPermissionsAsync();
		setHasPermission(status === 'granted');
	};

	const handleBarCodeScanned = (data: string) => {
		setIsScanned(true);
		isVibration && Vibration.vibrate();

		const newHistory: HistoryType = {
			id: uuid.v4().toString(),
			name: domainNameExtractor(data),
			link: data,
			scannedAt: Date.now().toString()
		};

		isSaveHistory && addHistory(newHistory);

		if (isAutoOpenLink && validateURL(newHistory.link)) {
			Linking.openURL(newHistory.link);
		} else {
			setNewHistory(newHistory);
		}
	};

	useEffect(() => {
		getBarCodeScannerPermissions();
	}, []);

	if (hasPermission === null) {
		return (
			<Layout>
				<View style={{ paddingLeft: 10, paddingRight: 10 }}>
					<UIText text='Загрузка...' textAlign='center' />
				</View>
			</Layout>
		);
	}

	if (!hasPermission) {
		return (
			<Layout>
				<View style={{ paddingLeft: 10, paddingRight: 10 }}>
					<UIText text='Не доступа к камере' textAlign='center' />
				</View>
				<UIButton name='Разрешить' onPress={getBarCodeScannerPermissions} />
			</Layout>
		);
	}

	if (isScanned) {
		return (
			<>
				<Layout>
					<View style={{ paddingLeft: 10, paddingRight: 10 }}>
						<UIText text='Нажмите кнопку, чтобы начать сканирование' textAlign='center' />
					</View>
					<UIButton name='Сканировать' onPress={() => setIsScanned(false)} />
				</Layout>
				{newHistory && <BottomSheet {...newHistory} onClose={() => setNewHistory(null)} />}
			</>
		);
	}

	return (
		<Layout>
			<Camera
				flashMode={isFlashlightModeTorch ? FlashMode.torch : FlashMode.off}
				style={styles.camera}
				barCodeScannerSettings={{
					barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
				}}
				onBarCodeScanned={(props) => (isScanned ? undefined : handleBarCodeScanned(props.data))}
			/>
		</Layout>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		height: '100%',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	container: {
		height: Dimensions.get('window').width * 0.9,
		width: Dimensions.get('window').width * 0.9,
		borderRadius: 23.5,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ffffff',
		overflow: 'hidden',
		position: 'relative',
		gap: 10
	},
	camera: {
		width: '100%',
		height: '100%',
		borderRadius: 23.5
	}
});
