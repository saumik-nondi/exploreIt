import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import  { addPlace } from '../../store/actions/index';
import ButtonBasic from '../../components/UI/ButtonBasic/ButtonBasic';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import InputContainer from '../../components/InputPlace/InputContainer';
import MapComponent from '../../components/MapComponent/MapComponent';
import PickImage from '../../components/PickImage/PickImage';
import validate from '../../uitility/Validator/validator';

class SharePlace extends Component {
    constructor(props){
        super(props);
        // Navigation.events().bindComponent(this, 'sharePlace');
        Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
            if (buttonId === 'toggleSideMenu') {
                Navigation.mergeOptions('sharePlace', {
                    sideMenu: {
                        left: {
                            visible: true
                        }
                    }
                })
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.detectPlaceAdd !== this.props.detectPlaceAdd){
            Navigation.mergeOptions('sharePlace', {
                bottomTabs: {
                    currentTabIndex: 1,
                    currentTabId: 'findPlace'
                }
            });
            this.reset();
            this.imagePicker.reset();
            this.locationPicker.reset();
        }
    }

    addPlaceHandler = () => {
        this.props.onAddPlace(this.state.controls.placeName.value, this.state.controls.location.value, this.state.controls.image.value);
    }


    handlePlaceName = (value) => {
        this.setState((prevState) => ({
            controls: {
                ...prevState.controls,
                placeName: {
                    ...prevState.controls.placeName,
                    value,
                    valid: validate(value, prevState.controls.placeName.validationRules),
                    touched: true
                }
            }
        }))
    }

    handleLocationPicked = (location) => {
        this.setState((prevState) => ({
            controls: {
                ...prevState.controls,
                location: {
                    ...prevState.controls.location,
                    value: location,
                    valid: true
                }
            }
        }))
    }

    handleImagePicked = (image) => {
        this.setState((prevState) => ({
            controls: {
                ...prevState.controls,
                image: {
                    value: image,
                    valid: true
                }
            }
        }))
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                location: {
                    value: null,
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                }
            }    
        })
    }

    componentWillMount() {
        this.reset();
    }


    render() {
        let submitButtonContent = (
            <ButtonBasic
                onPress={this.addPlaceHandler}
                color="#3462F7"
                toggleSubmit={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            >
                Share The Place
            </ButtonBasic>
        )

        if(this.props.isLoading){
            submitButtonContent = <ActivityIndicator />
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a place you explored!</HeadingText>
                    </MainText>
                    <PickImage 
                        onImagePicked={this.handleImagePicked}
                        ref={ ref => this.imagePicker = ref }
                    />
                    <MapComponent 
                        onLocationPick={this.handleLocationPicked} 
                        ref={ ref => this.locationPicker = ref }
                    />
                    <InputContainer 
                        onChangeText={this.handlePlaceName} 
                        submitText="Share The Place"
                        placeName={this.state.controls.placeName.value}
                        isValid={this.state.controls.placeName.valid}
                    />
                    {submitButtonContent}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
  detectPlaceAdd: state.places.placeAdded
}); 

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SharePlace); 