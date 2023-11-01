import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreem";

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [isGameOver, setIsGameOver] = useState(true);

	const pickedNumber = (num) => {
		setUserNumber(num);
		setIsGameOver(false);
	};

	const handleGameOver = () => {
		setIsGameOver(true);
	};
	let screen = <StartGameScreen onPickedNumber={pickedNumber} />;
	if (userNumber)
		screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
	if (isGameOver && userNumber) {
		screen = <GameOverScreen />;
	}

	return (
		<LinearGradient
			colors={[colors.primary700, colors.accent500]}
			style={styles.rootScreen}
		>
			<ImageBackground
				source={require("./assets/images/background.png")}
				resizeMode="cover"
				style={styles.rootScreen}
				imageStyle={{ opacity: 0.2 }}
			>
				<SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
});
