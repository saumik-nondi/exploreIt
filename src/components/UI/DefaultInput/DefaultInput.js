import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default (props) => (
    <TextInput
        {...props}
        style={[
            styles.input, 
            props.style, 
          !props.isValid && props.touched ? styles.inValid : null 
        ]}
    />
)

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    margin: 8
  },
  inValid: {
    backgroundColor: "#EB7A7A",
    borderColor: "#D42424",
    borderWidth: 2
  }
});