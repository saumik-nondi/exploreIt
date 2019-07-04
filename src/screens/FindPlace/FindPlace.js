import React, { Component } from 'react';
import { View, StyleSheet, Animated } from "react-native";
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import ListContainer from '../../components/ListItem/ListContainer';
import ButtonBasic from '../../components/UI/ButtonBasic/ButtonBasic';
import { getPlaces } from '../../store/actions/index';

class FindPlace extends Component {
    state = {
        placesLoaded: false,
        removeAnim: new Animated.Value(1)
    }

    handleItemSelected = (key) => {
        const selectedItem = this.props.places.find((place) => place.key === key);
        Navigation.push('findPlace', {
            component: {
                name: 'exploreit.PlaceDetail',
                passProps: {
                    selectedPlace: selectedItem
                },
                options: {
                    topBar: {
                        title: {
                            text: selectedItem.value
                        }
                    }
                }
            }
        })
    }

    onFindPlaceHandler = () => {
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            })
        });
    }

    componentDidMount() {
        this.props.onLoadPlaces();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detectPlaceAdd !== this.props.detectPlaceAdd) {
            this.props.onLoadPlaces();
        }
    }

    render() {
        let content = (
            <Animated.View
                style={[{
                    opacity: this.state.removeAnim,
                    transform: [
                        {
                            scale: this.state.removeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [12, 1]
                            })
                        }
                    ]
                }, styles.buttonContainer]}
            >
                <ButtonBasic 
                    style={{width: '60%', height: '15%'}} 
                    buttonTextStyle={{fontSize: 22}}
                    color="#FA6D20" 
                    onPress={this.onFindPlaceHandler}
                >
                    Find Place!
                </ButtonBasic>
                {/* <TouchableOpacity onPress={this.onFindPlaceHandler}>
                    <View>
                        <Text>Find Place!</Text>
                    </View>
                </TouchableOpacity> */}
            </Animated.View>
        );

        if(this.state.placesLoaded){
            content = (
                <ListContainer
                    places={this.props.places}
                    onItemSelected={this.handleItemSelected}
                />
            )
        }

        return (
            <View style={styles.container}>
                {content}    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems : 'center',
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1
    }
})

const mapStateToProps = state => ({
  places: state.places.places,
  detectPlaceAdd: state.places.placeAdded
});

const mapDispatchToProps = (dispatch) => ({
    onLoadPlaces: () => dispatch(getPlaces())
})

export default connect(mapStateToProps, mapDispatchToProps)(FindPlace); 