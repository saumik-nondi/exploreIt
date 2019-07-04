import React, { Component } from 'react';
import { View, Button, StyleSheet, Image, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons';
import { deletePlace } from '../../store/actions/index';
import MainText from '../../components/UI/MainText/MainText';
import MapComponent from '../../components/MapComponent/MapComponent';

class PlaceDetail extends Component{
    deleteHandler = () => {
        this.props.onItemDelete(this.props.inheritedProps.selectedPlace.key, this.props.inheritedProps.selectedPlace.image.ref);
        Navigation.pop(this.props.inheritedProps.componentId);
    }

    render(){
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback 
                    onPress={() => { Navigation.pop(this.props.inheritedProps.componentId) }}
                >
                    <View style={styles.backButton}>
                        <Icon type="Ionicons" size={30} name="md-arrow-round-back" color="#3462F7" />
                        <MainText> Go Back</MainText>
                    </View>
                </TouchableNativeFeedback>
                <View style={{flex:1}}>
                    <Image style={styles.placeImage} source={this.props.inheritedProps.selectedPlace.image} />
                    <Text style={styles.placeName}>{this.props.inheritedProps.selectedPlace.value}</Text>
                    <MapComponent location={this.props.inheritedProps.selectedPlace.location} />
                </View>
                <TouchableOpacity onPress={this.deleteHandler}>
                    <View style={styles.deleteButton}>
                        <Icon 
                            type="Ionicons" size={30} 
                            name={Platform.OS === 'android' ? "md-trash" : "ios-trash"} 
                            color="red" 
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        margin : 22,
    },
    placeImage : {
        width : '100%',
        height : 200
    },
    placeName : {
        fontWeight : 'bold',
        textAlign : 'center',
        fontSize : 28
    },
    deleteButton: {
        alignItems: 'center'
    },
    backButton: {
        flexDirection: 'row',
    }
})

const mapDispatchToProps = (dispatch) => ({
    onItemDelete: (key, imageRef) => dispatch(deletePlace(key, imageRef))
})

export default connect(null, mapDispatchToProps)(PlaceDetail);