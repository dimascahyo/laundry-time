import React, { Component } from "react";
import {StyleSheet, Text, View, Image} from 'react-native';
import Constants from "expo-constants";

export default class Front extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("homeStack");
    }, 5000);
  }
  render() {
    return (
        <View
          style={{
            marginTop: Constants.statusBarHeight,
            backgroundColor: '#D88532',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View>
            <Image style={styles.centerImage} source={require("../assets/images/logo.png")} alt="Judul Logo" />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  centerImage:{
    flex: 1,
    width: 180,
    height: 180,
    resizeMode: 'contain' 
  }
})