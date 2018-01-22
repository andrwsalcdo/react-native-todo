import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from "react-native";


class TodoItem extends Component {
	render() {
		const { complete, text, editing } = this.props;
		const textComponent = (
				<TouchableOpacity style={styles.textWrap} onLongPress={() => this.props.onToggleEdit(true)}>
					<Text style={[styles.text, complete && styles.complete]}>{text}</Text>
				</TouchableOpacity>
		)
		const deleteButton = (
			    <TouchableOpacity onPress={this.props.onDelete}>
                    <Text style={styles.delete}>X</Text>
                </TouchableOpacity>
		)
		const editingComponent = (
				<View style={styles.textWrap}>
					<TextInput
						onChangeText={this.props.onUpdate}
						autoFocus
						value={text}
						style={styles.input}
						multiline={true}
					/>
				</View>
		)
		const doneButton = (
			    <TouchableOpacity style={styles.done} onPress={() => this.props.onToggleEdit(false)}>
                    <Text style={styles.doneText}>Save</Text>
                </TouchableOpacity>
		)
		return (
			<View style={styles.container}>
				<Switch value={complete} onValueChange={this.props.onComplete} />
				{ editing ? editingComponent : textComponent }
				{ editing ? doneButton : deleteButton }
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
	input: {
		height: 100,
		flex: 1, 
		fontSize: 24,
		padding: 0,
		color: '#4d4d4d'
	},
	textWrap: {
		flex: 1,
		marginHorizontal: 10
	},
	complete: {
		textDecorationLine: "line-through",
		textDecorationColor: "#4cd964" // green,
	},
	done: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#7be290",
		padding: 7
	},
	doneText: {
		color: '#4d4d4d',
		fontSize: 16
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