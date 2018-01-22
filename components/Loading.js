import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

class Loading extends Component {
	render() {
		return (
			<View style={styles.loading}>
				<ActivityIndicator animating size="large" color="#cc9a9a" />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loading: {
		position: "absolute",
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.2)"
	}
});

export default Loading;
