import { HistoryType } from '../types/historyType';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import Toast from 'react-native-root-toast';
import { UIBottomSheet } from './ui/UIBottomSheet';
import { UIButton } from './ui/UIButton';
import { validateURL } from '../utils/validateUrl';
import { StyleSheet, View } from 'react-native';
import { UIText } from './ui/UIText';

type BottomSheetPropsType = HistoryType & {
	onClose?: () => void;
};

export const BottomSheet = (props: BottomSheetPropsType) => {
	const { name, link, onClose } = props;

	const copyToClipboard = async (payload: string) => {
		await Clipboard.setStringAsync(payload);

		if (validateURL(link)) {
			Toast.show('Ссылка скопирована', {
				duration: Toast.durations.SHORT
			});
		} else {
			Toast.show('Текст скопирован', {
				duration: Toast.durations.SHORT
			});
		}
	};

	const openUrl = () => {
		Linking.openURL(link);
	};

	return (
		<UIBottomSheet onClose={onClose}>
			<View style={styles.wrapper}>
				<View style={styles.container}>
					<UIText text={name} fontSize={30} numberOfLines={2} fontFamily='Inter-Bold' />
					<UIText text={link} fontSize={18} numberOfLines={5} />
				</View>
				<View style={styles.container}>
					{validateURL(link) && <UIButton name='Перейти по ссылке' onPress={openUrl} />}
					<UIButton
						name={validateURL(link) ? 'Скопировать ссылку' : 'Скопировать текст'}
						onPress={() => copyToClipboard(link)}
					/>
				</View>
			</View>
		</UIBottomSheet>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: 15
	},
	container: {
		flexDirection: 'column',
		gap: 10
	}
});
