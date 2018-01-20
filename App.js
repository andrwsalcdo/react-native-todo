import React from "react";
import { StyleSheet, Text, View, Keyboard, FlatList } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoItem from "./components/TodoItem";
import filterItems from './utils/helper';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			items: [],
			allComplete: false,
			filter: "ALL",
			visibleItems: []
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
			value: "",
			visibleItems: filterItems(this.state.filter, newItems)
		});
	};

	handleFilter = filter => {
		const visibleItems = filterItems(filter, this.state.items);
		this.setState({
			items: this.state.items,
			filter,
			visibleItems		
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
			allComplete: complete,
			visibleItems: filterItems(this.state.filter, newItems)
		});
	};

	handleDeleteItem = key => {
		const newItems = this.state.items.filter(item => item.key !== key);
		this.setState({
			items: newItems,
			visibleItems: filterItems(this.state.filter, newItems)
		});
	};

	handleToggleComplete = (key, complete) => {
		const newItems = this.state.items.map(item => {
			if (item.key !== key) return item;
			return {
				...item,
				complete
			};
		});
		this.setState({
			items: newItems,
			visibleItems: filterItems(this.state.filter, newItems)
		});
	};

	handleClearAllComplete= () => {
		const newItems = filterItems("ACTIVE", this.state.items); 
		this.setState({
			items: newItems, 
			visibleItems: newItems,
			filter: "ALL" //switch tab to 'all'. To prevent active items from displaying in completed tab. 
		})
	}

	// key for each todo item
	_keyExtractor = item => item.key;
	// render the todo item component
	renderTodoItem = ({ item }) => (
		<TodoItem
			text={item.text}
			complete={item.complete}
			onComplete={complete => this.handleToggleComplete(item.key, complete)}
			onDelete={() => this.handleDeleteItem(item.key)}
		/>
	);

	todoItemSeparator = () => {
		return <View style={styles.todoItemSeparator} />;
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
						data={this.state.visibleItems}
						renderItem={this.renderTodoItem}
						keyExtractor={this._keyExtractor}
						// keyboard disappears when user scrolls the list
						onScroll={() => Keyboard.dismiss()}
						ItemSeparatorComponent={this.todoItemSeparator}
					/>
				</View>
				<Footer 
					count={this.state.visibleItems.length || null} 
					onFilter={this.handleFilter} 
					filter={this.state.filter}
					onClearAllComplete={this.handleClearAllComplete} />
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
		backgroundColor: "#CED0CE"
	}
});

export default App;
