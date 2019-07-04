import React from 'react';
import { StyleSheet, View } from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

export default (props) => (
    <View style={styles.container}>
        <DefaultInput 
            {...props}
            placeholder="Place Name" 
            value={props.placeName}
            onChangeText={props.onChangeText}
        />
    </View>
)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'    
    }
})