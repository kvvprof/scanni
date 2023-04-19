import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { UIText } from './UIText';

type UIButtonPropsType = {
	name: string;
	onPress: () => void;
};

export const UIButton = (props: UIButtonPropsType) => {
	const { name, onPress } = props;

	return (
		<TouchableOpacity style={styles.wrapper} onPress={onPress}>
			<UIText text={name} color='#ffffff' />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: '#704ed4',
		borderRadius: 15,
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
