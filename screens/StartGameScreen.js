import { Alert, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import colors from "../constants/colors";

export default function StartGameScreen({ onPickedNumber }) {
	const [enteredNumber, setEnteredNumber] = useState("");

	const handleNumberChange = (text) => {
		setEnteredNumber(text);
	};

	const handleConfirmedNumber = () => {
		const numText = parseInt(enteredNumber);
		if (isNaN(numText) || numText <= 0 || numText > 99) {
			Alert.alert("Invalid number!", "It has to be a number between 1 and 99", [
				{
					text: "Okay",
					style: "destructive",
					onPress: setEnteredNumber.bind(this, ""),
				},
			]);
			return;
		}
		onPickedNumber(numText);
	};
	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={styles.numberInput}
				maxLength={2}
				keyboardType="number-pad"
				autoCapitalize="none"
				autoCorrect={false}
				value={enteredNumber}
				onChangeText={handleNumberChange}
			/>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={setEnteredNumber.bind(this, "")}>
						Reset
					</PrimaryButton>
				</View>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={handleConfirmedNumber}>Confirm</PrimaryButton>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 100,
		marginHorizontal: 24,
		borderRadius: 8,
		padding: 16,
		backgroundColor: colors.primary800,
		elevation: 8,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.25,
	},
	numberInput: {
		height: 50,
		width: 50,
		textAlign: "center",
		fontSize: 32,
		borderBottomColor: colors.accent500,
		borderBottomWidth: 2,
		color: colors.accent500,
		marginVertical: 8,
		fontWeight: "bold",
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	buttonContainer: {
		flex: 1,
	},
});
