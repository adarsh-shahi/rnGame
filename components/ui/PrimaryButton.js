import { Text, View, Pressable, StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default function PrimaryButton({ children, onPress }) {
	return (
		<View style={styles.buttonOuterContainer}>
			<Pressable
				onPress={onPress}
				android_ripple={{ color: colors.primary600 }}
				style={({ pressed }) =>
					pressed
						? [styles.buttonInnerContainer, styles.pressed]
						: styles.buttonInnerContainer
				}
			>
				<Text style={styles.buttonText}>{children}</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: "hidden",
	},
	buttonInnerContainer: {
		backgroundColor: colors.primary500,
		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 4,
	},
	buttonText: {
		color: "#fff",
		textAlign: "center",
	},
	pressed: {
		opacity: 0.75,
	},
});
