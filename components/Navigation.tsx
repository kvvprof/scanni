import { NavigationContainer } from '@react-navigation/native';
import { ScanScreen } from '../screens/ScanScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Image } from 'expo-image';
import { useScanStore } from '../stores/scanStore';

export const Navigation = () => {
	const Tab = createBottomTabNavigator();
	const setIsScanned = useScanStore((state) => state.setIsScanned);

	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName='ScanScreen'
				screenOptions={{
					tabBarShowLabel: false,
					tabBarStyle: { ...styles.navigator }
				}}>
				<Tab.Screen
					name='HistoryScreen'
					component={HistoryScreen}
					options={({ navigation }) => ({
						headerShown: false,
						tabBarIcon: (props) => (
							<TouchableOpacity
								onPress={() => {
									setIsScanned(true);
									navigation.navigate(HistoryScreen);
								}}>
								<View>
									<Image
										source={
											props.focused
												? require('../assets/images/clock-active.svg')
												: require('../assets/images/clock.svg')
										}
										style={{ width: 30, height: 30 }}
									/>
								</View>
							</TouchableOpacity>
						)
					})}
				/>

				<Tab.Screen
					name='ScanScreen'
					component={ScanScreen}
					options={({ navigation }) => ({
						headerShown: false,
						tabBarIcon: (props) => (
							<TouchableOpacity onPress={() => navigation.navigate(ScanScreen)}>
								<View>
									<Image
										source={
											props.focused
												? require('../assets/images/qr-code-active.svg')
												: require('../assets/images/qr-code.svg')
										}
										style={{ width: 30, height: 30 }}
									/>
								</View>
							</TouchableOpacity>
						)
					})}
				/>

				<Tab.Screen
					name='SettingsScreen'
					component={SettingsScreen}
					options={({ navigation }) => ({
						headerShown: false,
						tabBarIcon: (props) => (
							<TouchableOpacity
								onPress={() => {
									setIsScanned(true);
									navigation.navigate(SettingsScreen);
								}}>
								<View>
									<Image
										source={
											props.focused ? require('../assets/images/cog-active.svg') : require('../assets/images/cog.svg')
										}
										style={{ width: 30, height: 30 }}
									/>
								</View>
							</TouchableOpacity>
						)
					})}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	navigator: {
		position: 'absolute',
		borderRadius: 20,
		backgroundColor: '#ffffff',
		borderTopWidth: 0,
		borderTopColor: 'transparent',
		height: 70,
		left: 17,
		right: 17,
		bottom: 20,
		elevation: 0,
		...Platform.select({
			ios: {
				flexDirection: 'row',
				alignItems: 'center'
			}
		})
	}
});
