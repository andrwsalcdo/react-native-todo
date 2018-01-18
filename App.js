import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      value: "", 
      items: [], 
      allComplete: false
    }
  }

  handleAddItem = () => {
    // don't add empty text to items
    if(!this.state.value) return; 
    const newItems = [
      ...this.state.items, 
      {
        key: Date.now(), 
        text: this.state.value, 
        complete: false 
      }
    ]
    this.setState({ 
      items: newItems, 
      value: ""
    })
  }

  handleToggleAllComplete = () => {
    const complete = !this.state.allComplete; 
    const newItems = this.state.items.map((item) => ({
      ...item, 
      complete
    }))
    //debugging 
    console.table(newItems);
    this.setState({
      items: newItems, 
      allComplete: complete
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <Text>hey</Text>
        </View>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f5f5f5', 
    paddingTop: 30
  },
  content: {
    flex: 1
  }
});

export default App; 