import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default (props) => (
    <Text style={[styles.mainText, props.style]}>
        {props.children}
    </Text>
)

const styles = StyleSheet.create({
  mainText: {
    fontSize: 20,
    backgroundColor: "transparent",
    fontFamily: "Lato-Semibold"
  }
});