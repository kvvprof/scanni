import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Navigation } from './components/Navigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

const App = () => {
	const [fontsLoaded] = useFonts({
		'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
		'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
		'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf')
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<RootSiblingParent>
				<Navigation />
			</RootSiblingParent>
		</GestureHandlerRootView>
	);
};

export default App;
