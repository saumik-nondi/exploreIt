import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default (props) => (
    <Text style={[styles.textHeading, props.style]}>
        {props.children} 
    </Text>
)

const styles = StyleSheet.create({
  textHeading: {
    fontSize: 28,
    fontWeight: "bold",
  }
});