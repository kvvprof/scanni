import { Text, View, Switch, StyleSheet, Platform } from 'react-native';
import { useSettingsStore } from '../stores/settingsStore';
import { UIText } from './ui/UIText';

type SettingsItemPropsType = {
	name: string;
	value: boolean;
	onChange: () => void;
};

const SettingsItem = (props: SettingsItemPropsType) => {
	const { name, value, onChange } = props;

	return (
		<View style={styles.settingsItemWrapper}>
			<Switch
				trackColor={{ false: '#ebedf0', true: '#ebedf0' }}
				thumbColor={value ? '#7ad76a' : '#ebedf0'}
				ios_backgroundColor='#ebedf0'
				onValueChange={onChange}
				value={value}
			/>

			<View style={{ width: '80%' }}>
				<UIText text={name} numberOfLines={2} />
			</View>
		</View>
	);
};

const History = () => {
	const isSaveHistory = useSettingsStore((state) => state.isSaveHistory);
	const setIsSaveHistory = useSettingsStore((state) => state.setIsSaveHistory);

	return <SettingsItem name='Сохранять историю сканирования' value={isSaveHistory} onChange={setIsSaveHistory} />;
};

const AutoOpenLink = () => {
	const isAutoOpenLink = useSettingsStore((state) => state.isAutoOpenLink);
	const setIsAutoOpenLink = useSettingsStore((state) => state.setIsAutoOpenLink);

	return (
		<SettingsItem
			name='Переходить по ссылке сразу после сканирования'
			value={isAutoOpenLink}
			onChange={setIsAutoOpenLink}
		/>
	);
};

const Vibration = () => {
	const isVibration = useSettingsStore((state) => state.isVibration);
	const setIsVibration = useSettingsStore((state) => state.setIsVibration);

	return <SettingsItem name='Вибрация при успешном сканировании' value={isVibration} onChange={setIsVibration} />;
};

const FlashlightModeTorch = () => {
	const isFlashlightModeTorch = useSettingsStore((state) => state.isFlashlightModeTorch);
	const setIsFlashlightModeTorch = useSettingsStore((state) => state.setIsFlashlightModeTorch);

	return (
		<SettingsItem
			name='Сканировать со включенной вспышкой'
			value={isFlashlightModeTorch}
			onChange={setIsFlashlightModeTorch}
		/>
	);
};

export const Settings = () => {
	return (
		<View style={{ gap: 12 }}>
			<History />
			<Vibration />
			<FlashlightModeTorch />
			<AutoOpenLink />
		</View>
	);
};

const styles = StyleSheet.create({
	settingsItemWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#ffffff',
		padding: 5,
		borderRadius: 15,
		height: 70,
		gap: 5,
		...Platform.select({
			ios: {},
			android: {}
		})
	}
});
