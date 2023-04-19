import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UIText } from './ui/UIText';

type LayoutPropsType = {
	title: string;
	children?: ReactNode;
};

export const Layout = (props: LayoutPropsType) => {
	const { title, children } = props;

	return (
		<SafeAreaView style={styles.wrapper}>
			<View style={styles.container}>
				<View style={styles.underline}>
					<UIText text={title} fontFamily='Inter-Bold' fontSize={30} numberOfLines={1} />
				</View>
				<View style={styles.content}>{children}</View>
				<View style={styles.footer} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		height: '100%',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#f2f3f5'
	},
	container: {
		width: '90%',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'space-between',
		gap: 20,
		paddingBottom: 20,
		paddingTop: 20
	},
	underline: {
		borderBottomWidth: 3,
		borderColor: '#704ed4',
		alignSelf: 'flex-start'
	},
	content: {
		flex: 1
	},
	footer: {
		height: 70
	}
});
