import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";


class TodoItem extends Component {
	render() {
		const { complete, text } = this.props;
		return (
			<View style={styles.container}>
				<Switch value={complete} onValueChange={this.props.onComplete} />
				<View style={styles.textWrap}>
					<Text style={[styles.text, complete && styles.complete]}>{text}</Text>
				</View>
                <TouchableOpacity onPress={this.props.onDelete}>
                    <Text style={styles.delete}>X</Text>
                </TouchableOpacity>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between"
	},
	textWrap: {
		flex: 1,
		marginHorizontal: 10
	},
	complete: {
		textDecorationLine: "line-through",
		textDecorationColor: "#4cd964" // green,
    },
    delete: {
        fontSize: 20, 
        color: "#cc9a9a",
        marginRight: 10
    },
	text: {
		fontSize: 24,
		color: "#4d4d4d" // very dark grey
	}
});

export default TodoItem;