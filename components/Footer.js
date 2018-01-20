import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class Footer extends Component {
	render() {
    const { filter, count } = this.props;
    const counter = <Text>{count}</Text>;
    return (
			<View style={styles.container}>
        {
          // conditional rendering 
          (count) ? counter : null          
        }
				<View style={styles.filters}>
          <TouchableOpacity 
              style={[styles.filter, filter === "ALL" && styles.selected]}
              onPress={() => this.props.onFilter("ALL")}
          >
            <Text>All</Text>
					</TouchableOpacity>
          <TouchableOpacity 
              style={[styles.filter, filter === "ACTIVE" && styles.selected]} 
              onPress={() => this.props.onFilter("ACTIVE")}
          >
            <Text>Active</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.filter, filter === "COMPLETED" && styles.selected]}
						onPress={() => this.props.onFilter("COMPLETED")}
					>
						<Text>Completed</Text>
					</TouchableOpacity>
				</View>
          {
              (filter==="COMPLETED" && count > 0) 
                 ? <TouchableOpacity onPress={this.props.onClearAllComplete}>
                    <Text>Clear All</Text>
                  </TouchableOpacity>
                : null
          }
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		flexDirection: "row",
		alignItems: "center",
    justifyContent: "space-between"
	},
	filters: {
		flexDirection: "row"
	},
	filter: {
		padding: 8,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "transparent"
	},
	selected: {
		borderColor: "rgba(175, 47, 47, .2)"
	}
});

export default Footer;