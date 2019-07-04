import React from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Image } from 'react-native';

export default (props) => (
    <TouchableNativeFeedback onPress={props.onItemPress}>
        <View style={styles.listItem}>
            <Image resizeMode="cover" style={styles.placeImage} source={props.placeImage} />
            <Text>{props.placeName}</Text>
        </View>
    </TouchableNativeFeedback>
)

const styles = StyleSheet.create({
    listItem : {
        width : '100%',
        padding : 10,
        backgroundColor : '#eee',
        marginBottom : 5,
        flexDirection : 'row',
    },
    placeImage : {
        height : 30,
        width : 30
    }
})