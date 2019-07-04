import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import ButtonBasic from '../UI/ButtonBasic/ButtonBasic';
import ImagePicker from 'react-native-image-picker';    

class PickImage extends Component {
    state = {
        pickedImage: null
    }

    reset = () => {
        this.setState({
            pickedImage: null
        })
    }

    onPickImageHandler = () => {
        ImagePicker.showImagePicker({
            title: 'Choose an image to upload!',
            noData: true,
            maxHeight: 600,
            maxWidth: 800
        }, (response) => {
            if(response.didCancel){
                console.log('User cancelled image picker');
            }else if(response.error){
                console.log('ImagePicker error: ', response.error);
            }else {
                this.setState({
                    pickedImage: { uri: response.uri }
                })
                this.props.onImagePicked({uri : response.uri});
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={this.state.pickedImage} style={styles.imagePreview}/>
                </View>
                <ButtonBasic onPress={this.onPickImageHandler} color="#3462F7">Pick Image</ButtonBasic>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%"
  },
  imagePreview: {
    width: "100%",
    height: '100%'
  },
  imageContainer: {
    height: 200,
    width: "80%",
    borderWidth: 1,
    borderColor: "black"  
  }
});

export default PickImage;

