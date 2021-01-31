import React from "react";
import { Text, View } from "react-native";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View>
        <View
          style={{
            marginBottom: 20,
            backgroundColor: "red",
            width: 320,
            height: 50
          }}
        >
          <Text style={{ align: "center", width: 500 }}>List</Text>
        </View>
      </View>
    );
  }
}
