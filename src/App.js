import React from "react";
import { Button, Text, StyleSheet, View, FlatList, Image } from "react-native";
import { createStackNavigator } from "react-navigation";
import { ListItem } from "react-native-elements";

class HomeScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      dataSource: [
        { key: 1, name: "const abc item" },
        { key: 2, name: "const def item" }
      ]
    };
    this.getRemoteData();
  }
  static navigationOptions = {
    title: "Home"
  };

  getRemoteData = () => {
    const url = "https://randomuser.me/api/?seed=1&page=1&results=10";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          data: res.results
        });
      })
      .catch((error) => {
        console.log("get data error from:" + url + " error:" + error);
      });
  };

  capFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  renderNativeItem = (item) => {
    const name =
      this.capFirstLetter(item.name.title) +
      ". " +
      this.capFirstLetter(item.name.first) +
      " " +
      this.capFirstLetter(item.name.last);
    return (
      <ListItem
        roundAvatar
        title={name}
        subtitle={item.email}
        avatar={{ uri: item.picture.thumbnail }}
        onPress={() => this.onPressItem(item)}
      />
    );
  };

  onPressItem = (item) => {
    const email = item.email;
    console.log("onPress email with item: " + item.email);
    this.props.navigation.navigate("Detail", { item: item });
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => this.renderNativeItem(item)}
        />
        <Button
          title="Go Detail"
          onPress={() =>
            this.props.navigation.navigate("Detail", { source: "homescreen" })
          }
        />
      </View>
    );
  }
}

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: "Detail"
  };

  render() {
    const source = this.props.navigation.state.params.source;
    const item = this.props.navigation.state.params.item;
    let name = "";
    let img = "";
    let email = "";
    if (item != null) {
      name = item.name.first + " " + item.name.last;
      img = item.picture.medium;
      email = item.email;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>name: {name}</Text>
        <Image style={{ width: 128, height: 128 }} source={{ uri: img }} />
        <Text style={styles.text}>{email}</Text>
        <Button title="Home" onPress={this._goHome} />
      </View>
    );
  }
  _goHome = async () => {
    this.props.navigation.navigate("Home");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 16
  }
});

export default createStackNavigator({
  Home: HomeScreen,
  Detail: DetailScreen
});
