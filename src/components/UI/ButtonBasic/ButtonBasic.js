import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';

const disableButton = () => {
    // console.log('Button Disabled')
}

export default (props) => {
    const content = (
        <View style={[
            styles.button, 
            { backgroundColor: props.color }, 
            props.style,
            props.toggleSubmit ? styles.buttonDisabled : null 
        ]}>
            <Text style={[styles.buttonText, props.buttonTextStyle]}>
                {props.children}
            </Text>
        </View>
    )

    if(Platform.OS === "android"){
        return(
            <TouchableNativeFeedback onPress={props.toggleSubmit ? disableButton : props.onPress}>
                {content}
            </TouchableNativeFeedback>
        );
    }
    return <TouchableOpacity
        onPress={props.toggleSubmit ? disableButton : props.onPress}
      >
        {content}
      </TouchableOpacity>;

}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        margin: 5,
        borderRadius: 18,
        alignItems : 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },
    buttonDisabled: {
        backgroundColor: '#eee',
    }
})