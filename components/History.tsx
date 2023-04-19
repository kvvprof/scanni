import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import { HistoryType } from '../types/historyType';
import { useHistoryStore } from '../stores/historyStore';
import { BottomSheet } from './BottomSheet';
import { parseTimestamp } from '../utils/parseTimestamp';
import { useSettingsStore } from '../stores/settingsStore';
import { useEffect } from 'react';
import { UIText } from './ui/UIText';

type HistoryInfoPropsType = {
	title: string;
};

const Info = (props: HistoryInfoPropsType) => {
	const { title } = props;

	return (
		<View style={styles.infoWrapper}>
			<UIText text={title} textAlign='center' />
		</View>
	);
};

const Item = (props: HistoryType) => {
	const { name, link, scannedAt } = props;
	const setCurrentHistory = useHistoryStore((state) => state.setCurrentHistory);

	return (
		<>
			<TouchableOpacity onPress={() => setCurrentHistory(props)}>
				<View style={styles.itemWrapper}>
					<UIText text={name} fontSize={20} fontFamily='Inter-Medium' />
					<UIText text={link} fontSize={12} />
					<View style={styles.itemDate}>
						<UIText text={parseTimestamp(scannedAt)} fontSize={10} />
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

export const History = () => {
	const history = useHistoryStore((state) => state.history);
	const currentHistory = useHistoryStore((state) => state.currentHistory);
	const isSaveHistory = useSettingsStore((state) => state.isSaveHistory);
	const setCurrentHistory = useHistoryStore((state) => state.setCurrentHistory);
	const clearHistory = useHistoryStore((state) => state.clearHistory);

	useEffect(() => {
		if (history.length && !isSaveHistory) {
			clearHistory();
		}
	}, [isSaveHistory]);

	return (
		<>
			<FlatList
				maxToRenderPerBatch={10}
				data={history}
				renderItem={({ item }) => <Item {...item} />}
				keyExtractor={(item) => item.id}
			/>
			{currentHistory && <BottomSheet {...currentHistory} onClose={() => setCurrentHistory(null)} />}

			{!isSaveHistory && <Info title='История сканирования отключена в настройках приложения' />}

			{!history.length && <Info title='Истории сканирования пока нет' />}
		</>
	);
};

const styles = StyleSheet.create({
	itemWrapper: {
		width: '100%',
		backgroundColor: '#ffffff',
		padding: 12,
		borderRadius: 20,
		marginBottom: 10,
		gap: 2,
		position: 'relative'
	},
	itemDate: {
		position: 'absolute',
		top: 5,
		right: 15,
		fontSize: 10
	},
	infoWrapper: {
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	}
});
