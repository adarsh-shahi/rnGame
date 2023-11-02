import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

export default function NumberContainer({ children }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 4,
		borderColor: colors.accent500,
		borderRadius: 8,
		margin: 24,
		padding: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: colors.accent500,
		fontSize: 36,
		fontFamily: "open-sans-bold",
	},
});
