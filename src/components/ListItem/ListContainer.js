import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ListItem from './ListItem';

export default (props) => (
    <FlatList 
        style={styles.listContainer}
        data={props.places}
        renderItem={(info) => (
            <ListItem
                placeName={info.item.value}
                placeImage = {info.item.image}
                onItemPress={() => props.onItemSelected(info.item.key)}
            />
        )}
    />
)

const styles = StyleSheet.create({
    listContainer: {
        flex : 1,
        width: '100%',
        height: '100%',
        paddingBottom : 5 
    }
}) 