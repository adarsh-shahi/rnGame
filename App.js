import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreem";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [isGameOver, setIsGameOver] = useState(true);
	const [guessCount, setGuessCount] = useState(0);

	const [fontsLoaded] = useFonts({
		"open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
		"open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
	});

	if (!fontsLoaded) return <AppLoading />;

	const pickedNumber = (num) => {
		setUserNumber(num);
		setIsGameOver(false);
	};

	const handleStartNewGame = () => {
		setUserNumber(null);
		setGuessCount(0);
	};

	const handleGameOver = (numOfRounds) => {
		setGuessCount(numOfRounds);
		setIsGameOver(true);
	};
	let screen = <StartGameScreen onPickedNumber={pickedNumber} />;
	if (userNumber)
		screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
	if (isGameOver && userNumber) {
		screen = (
			<GameOverScreen
				userNum={userNumber}
				roundsNum={guessCount}
				onStartNewGame={handleStartNewGame}
			/>
		);
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
