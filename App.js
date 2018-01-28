import React from "react";
import { StyleSheet, Text, View, Keyboard, FlatList, AsyncStorage, KeyboardAvoidingView } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoItem from "./components/TodoItem";
import Loading from "./components/Loading";
import { filterItems, setAsyncData } from "./utils/helper";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			items: [],
			allComplete: false,
			filter: "ALL",
			visibleItems: [],
			loading: true
		};
	}
	componentWillMount() {
		this.getAsyncData();
	}

	getAsyncData = () => {
		AsyncStorage.getItem("items").then(json => {
			try {
				const items = JSON.parse(json);
				this.setData(items, items, { loading: false });
			} catch (e) {
				this.setState({
					loading: false
				});
			}
		});
	};
	
	//handle data with this.setState & set async storage
	setData = (items, visibleItems, otherState = {}) => {
		this.setState({
			items,
			visibleItems,
			...otherState
		});
		setAsyncData(items);
	};

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
		this.setData(newItems, filterItems(this.state.filter, newItems), { value: "" });
	};

	handleUpdateItemText = (key, text) => {
		const newItems = this.state.items.map(item => {
			if (item.key !== key) return item;
			return {
				...item,
				text
			};
		});
		this.setData(newItems, filterItems(this.state.filter, newItems));
	};

	handleToggleEditing = (key, editing) => {
		const newItems = this.state.items.map(item => {
			if (item.key !== key) return item;
			return {
				...item,
				editing
			};
		});
		this.setData(newItems, filterItems(this.state.filter, newItems));
	};

	handleFilter = filter => {
		const visibleItems = filterItems(filter, this.state.items);
		this.setData(this.state.items, visibleItems, { filter });
	};

	handleToggleAllComplete = () => {
		const complete = !this.state.allComplete;
		const newItems = this.state.items.map(item => ({
			...item,
			complete
		}));
		this.setData(newItems, filterItems(this.state.filter, newItems), { allComplete: complete });
	};

	handleDeleteItem = key => {
		const newItems = this.state.items.filter(item => item.key !== key);
		this.setData(newItems, filterItems(this.state.filter, newItems));
	};

	handleToggleComplete = (key, complete) => {
		const newItems = this.state.items.map(item => {
			if (item.key !== key) return item;
			return {
				...item,
				complete
			};
		});
		this.setData(newItems, filterItems(this.state.filter, newItems));
	};

	handleClearAllComplete = () => {
		const newItems = filterItems("ACTIVE", this.state.items);
		this.setData(newItems, filterItems(this.state.filter, newItems));
	};

	// key for each todo item
	_keyExtractor = item => item.key;
	// render the todo item component
	renderTodoItem = ({ item }) => (
		<TodoItem
			text={item.text}
			complete={item.complete}
			editing={item.editing}
			onUpdate={text => this.handleUpdateItemText(item.key, text)}
			onToggleEdit={editing => this.handleToggleEditing(item.key, editing)}
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
				<KeyboardAwareFlatList
					style={styles.list}
					data={this.state.visibleItems}
					renderItem={this.renderTodoItem}
					keyExtractor={this._keyExtractor}
					ItemSeparatorComponent={this.todoItemSeparator}
				/>
				<Footer
					count={this.state.visibleItems.length || null}
					onFilter={this.handleFilter}
					filter={this.state.filter}
					onClearAllComplete={this.handleClearAllComplete}
				/>
				{/* loading indicator */}
				{this.state.loading && <Loading />}
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
	list: {
		backgroundColor: "#fff"
	},
	todoItemSeparator: {
		height: 1,
		backgroundColor: "#CED0CE"
	}
});

export default App;
