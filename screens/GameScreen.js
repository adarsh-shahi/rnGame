import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

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

	const [guessRounds, setGuessRounds] = useState([initialGuess]);

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
		setGuessRounds((rounds) => [newRandNum, ...rounds]);
	};

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(guessRounds.length);
		}
	}, [currentGuess, userNumber, onGameOver]);

	useEffect(() => {
		min = 1;
		max = 100;
	}, []);

	const guessRoundsListLength = guessRounds.length;

	return (
		<View style={styles.screen}>
			<View>
				<Title>Opponent's Guesss</Title>
				<NumberContainer>{currentGuess}</NumberContainer>
			</View>
			<Card>
				<InstructionText style={styles.instructionText}>
					Higher or lower?
				</InstructionText>
				<View style={styles.buttonsContainer}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHanlder.bind(this, "higher")}>
							<Ionicons name="md-add" size={24} color="white" />
						</PrimaryButton>
					</View>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHanlder.bind(this, "lower")}>
							<Ionicons name="md-remove" size={24} color="white" />
						</PrimaryButton>
					</View>
				</View>
				<View>
					{/* {guessRounds.map((round) => {
						return <Text key={round}>{round}</Text>;
					})} */}
				</View>
			</Card>
			<View style={styles.listContainer}>
				<FlatList
					data={guessRounds}
					renderItem={({ index, item }) => (
						<GuessLogItem
							roundNumber={guessRoundsListLength - index}
							guess={item}
						/>
					)}
					keyExtractor={(item) => item}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		marginTop: 12,
		alignItems: "center",
	},
	instructionText: {
		marginBottom: 12,
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	},
});
