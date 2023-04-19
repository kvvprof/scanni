import { Platform } from 'react-native';
import { Text } from 'react-native';

type UITextPropsType = {
	text: string;
	fontSize?: number;
	color?: string;
	fontFamily?: 'Inter-Regular' | 'Inter-Medium' | 'Inter-Bold';
	numberOfLines?: number;
	textAlign?: 'auto' | 'center' | 'right' | 'left' | 'justify';
};

export const UIText = (props: UITextPropsType) => {
	const {
		text,
		fontSize = 15,
		color = '#000000',
		fontFamily = 'Inter-Regular',
		numberOfLines,
		textAlign = 'left'
	} = props;

	return (
		<Text
			style={{
				fontFamily: fontFamily,
				fontSize: fontSize,
				color: color,
				textAlign: textAlign,
				...Platform.select({
					ios: {
						fontSize: fontSize + 2
					}
				})
			}}
			numberOfLines={numberOfLines}>
			{text}
		</Text>
	);
};
