import React, { Component } from 'react';
import { 
    Text, 
    View, 
    Dimensions, 
    StyleSheet, 
    TouchableNativeFeedback,
    Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import { Navigation } from "react-native-navigation";

class SideMenu extends Component {
    onSignOut = () => {
        firebase.auth().signOut()
        .then(() => {
            Navigation.setRoot({
                root: {
                    component: {
                        id: 'authScreen',
                        name: 'exploreit.AuthScreen'
                    }
                }
            })
        })
        .catch((err) => {
            console.log(err);
            alert('Could not Sign Out! Try Again')
        })
    }

    render() {
        return (
            <View style={[
                    styles.container, 
                    { width: Dimensions.get('window').width * 0.8 }
                ]}>
                <TouchableNativeFeedback onPress={this.onSignOut}>
                    <View style={styles.logoutContainer}>
                        <Icon 
                            name={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"} 
                            size={30} 
                            color="white" 
                        />
                        <Text style={styles.logoutText}>Sign Out</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'white'
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#3462F7'
    },
    logoutText: {
        margin: 10,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default SideMenu;