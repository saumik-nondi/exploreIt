import React, { Component } from 'react';
import { View, 
    StyleSheet, 
    ImageBackground, 
    Dimensions, 
    KeyboardAvoidingView, 
    Keyboard, 
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from "react-native-splash-screen";

import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonBasic from '../../components/UI/ButtonBasic/ButtonBasic';

import backgroundImage from '../../assets/welcome-bg.jpg';
import validate from '../../uitility/Validator/validator';
import { tryAuth, autoSignIn } from "../../store/actions/index";

class AuthScreen extends Component{
    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        authMode: 'login',
        currentUser : null,
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
    }

    constructor(props){
        super(props);

        Dimensions.addEventListener('change', this.updateStyleMode);
    }

    updateStyleMode = (dims) => {
        this.setState({
          viewMode:
            dims.window.height > 500
              ? "portrait"
              : "landscape"
        });
    }

    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.updateStyleMode);
    }

    componentDidMount(){
        SplashScreen.hide();
        this.props.onAutoSignIn();
    }

    authHandler = () => {
        const authData = { 
            email: this.state.controls.email.value, 
            password: this.state.controls.password.value 
        };
        
        this.props.onTryAuth(authData, this.state.authMode);
    }

    switchAuthMode = () => {
        this.setState((prevState) => ({
            authMode: prevState.authMode === 'login' ? 'signup' : 'login'
        }))
    }

    updateInputState = (key, value) => {
        let connectedValues = { };
        if(this.state.controls[key].validationRules.equalTo){
            const connectedKey = this.state.controls[key].validationRules.equalTo;
            const checkVal = this.state.controls[connectedKey].value;
            connectedValues = {
                ...connectedValues,
                equalTo: checkVal
            }
        }

        if(key === 'password'){
            connectedValues = { ...connectedValues, equalTo: value };    
        }

        this.setState(prevState => ({
            controls:{
                ...prevState.controls,
                confirmPassword: {
                    ...prevState.controls.confirmPassword,
                    valid:
                        key === 'password'
                            ? validate(
                                prevState.controls.confirmPassword.value,
                                prevState.controls.confirmPassword.validationRules,
                                connectedValues
                            )
                            : prevState.controls.confirmPassword.valid
                },
                [key]: {
                    ...prevState.controls[key],
                    value: value,
                    valid: validate(value, prevState.controls[key].validationRules, connectedValues),
                    touched: true
                }
            }
        }));
    }

    render(){
        let confirmPasswordContent = null;
        if(this.state.authMode === 'signup'){
            confirmPasswordContent = <View style={this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                <DefaultInput style={[styles.input]} placeholder="Confirm Password" value={this.state.controls.confirmPassword.value} onChangeText={val => {
                    this.updateInputState("confirmPassword", val);
                  }} isValid={this.state.controls.confirmPassword.valid} touched={this.state.controls.confirmPassword.touched} secureTextEntry={true} />
              </View>;
        }

        let headerContent = null;
        if(this.state.viewMode === 'portrait'){
            headerContent = <MainText>
                <HeadingText>
                  Please{" "}
                  {this.state.authMode === "login"
                    ? "Login"
                    : "Sign Up"}
                </HeadingText>
              </MainText>;
        }

        let buttonContent = (
            <ButtonBasic onPress={this.authHandler} color="#3462F7" toggleSubmit={!this.state.controls.email.valid || !this.state.controls.password.valid || (!this.state.controls.confirmPassword.valid && this.state.authMode === "signup")}>
                Submit
            </ButtonBasic>
        )

        if(this.props.isLoading)
            buttonContent = <ActivityIndicator />

        return <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <KeyboardAvoidingView style={styles.container}>
              {headerContent}
              <ButtonBasic color="#3462F7" onPress={this.switchAuthMode}>
                    Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
              </ButtonBasic>
              
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inputContainer}>
                  <DefaultInput style={[styles.input]} placeholder="Your E-Mail Address" value={this.state.controls.email.value} onChangeText={val => this.updateInputState("email", val)} isValid={this.state.controls.email.valid} touched={this.state.controls.email.touched} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />
                  <View style={this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
                    <View style={this.state.viewMode === "portrait" || this.state.authMode === "login" ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                      <DefaultInput style={[styles.input]} placeholder="Password" value={this.state.controls.password.value} onChangeText={val => {
                          this.updateInputState("password", val);
                        }} isValid={this.state.controls.password.valid} touched={this.state.controls.password.touched} secureTextEntry={true} />
                    </View>

                    {confirmPasswordContent}
                  </View>
                </View>
              </TouchableWithoutFeedback>

              {buttonContent}
            </KeyboardAvoidingView>
          </ImageBackground>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',

    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb',
    },
    backgroundImage: {
        flex: 1,
        width: '100%'
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordWrapper: {
        width: '100%'
    },
    landscapePasswordWrapper: {
        width: '45%'
    }
})

const mapStateToProps = (state) => ({
    isLoading: state.ui.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
    onAutoSignIn: () => dispatch(autoSignIn())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen); 