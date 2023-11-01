import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

const generateRandomBetween = (min, max, exclude) => {
	const randNum = Math.floor(Math.random() * (max - min) + min);

	if (randNum === exclude) return generateRandomBetween(min, max, exclude);
	return randNum;
};

let min = 1;
let max = 100;

export default function GameScreen({ userNumber, onGameOver }) {
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);

	const nextGuessHanlder = (direction) => {
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "higher" && currentGuess > userNumber)
		) {
			Alert.alert("don't lie", "you know this is wrong...", [
				{ text: "sorry", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") max = currentGuess;
		else if (direction === "higher") min = currentGuess + 1;
		const newRandNum = generateRandomBetween(min, max, currentGuess);
		setCurrentGuess(newRandNum);
	};

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver();
		}
	}, [currentGuess, userNumber, onGameOver]);

	return (
		<View style={styles.screen}>
			<View>
				<Title>Opponent's Guesss</Title>
				<NumberContainer>{currentGuess}</NumberContainer>
			</View>
			<View>
				<Text>Higher or lower?</Text>
				<View style={styles.buttonsContainer}>
					<PrimaryButton onPress={nextGuessHanlder.bind(this, "higher")}>
						+
					</PrimaryButton>
					<PrimaryButton onPress={nextGuessHanlder.bind(this, "lower")}>
						-
					</PrimaryButton>
				</View>
			</View>
			{/* <View>LOG ROUNDS</View> */}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		marginTop: 12,
	},
	buttonsContainer: {
		flexDirection: "row",
	},
});
