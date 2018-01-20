import React from "react";
import { StyleSheet, Text, View, Keyboard, FlatList } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoItem from "./components/TodoItem";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			items: [],
			allComplete: false
		};
	}

	handleAddItem = () => {
		// don't add empty text to items
		if (!this.state.value) return;
		const newItems = [
			...this.state.items,
			{
				key: Date.now(),
				text: this.state.value,
				complete: false
			}
		];
		this.setState({
			items: newItems,
			value: ""
		});
	};

	handleToggleAllComplete = () => {
		const complete = !this.state.allComplete;
		const newItems = this.state.items.map(item => ({
			...item,
			complete
		}));
		this.setState({
			items: newItems,
			allComplete: complete
		});
	};

	handleToggleComplete = (key, complete) => {
		const newItems = this.state.items.map(item => {
			if (item.key !== key) return item; 
			return {
				...item, 
				complete
			}
		})
		this.setState({
			items: newItems
		})
	}

	// key for each todo item
	_keyExtractor = item => item.key;
	// render the todo item component
	renderTodoItem = ({ item }) => 
		<TodoItem text={item.text} 
				complete={item.complete} 
				onComplete={(complete) => this.handleToggleComplete(item.key,complete)}
		/>;

	todoItemSeparator = () => {
    	return ( <View style={styles.todoItemSeparator} />);
	};

	render() {
		return (
			<View style={styles.container}>
				<Header
					value={this.state.value}
					onAddItem={this.handleAddItem}
					onChange={value => this.setState({ value })}
					onToggleAllComplete={this.handleToggleAllComplete}
				/>
				<View style={styles.content}>
					<FlatList
						style={styles.list}
						data={this.state.items}
						renderItem={this.renderTodoItem}
						keyExtractor={this._keyExtractor}
						// keyboard disappears when user scrolls the list
            			onScroll={() => Keyboard.dismiss()}
						ItemSeparatorComponent={this.todoItemSeparator}
					/>
				</View>
				<Footer />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		paddingTop: 30
	},
	content: {
		flex: 1
	},
	list: {
		backgroundColor: "#fff"
	},
	todoItemSeparator: {
		height: 1,
		backgroundColor: "#CED0CE",
	}
});

export default App;