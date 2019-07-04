import { TRY_AUTH } from './actionTypes';
import firebase from 'react-native-firebase';
import { startLoading, stopLoading } from './index';
import startMainTabs from "../../screens/MainTabs/startMainTabs";

// export const tryAuth = (authData, authMode) => {
//     return dispatch => {
//         dispatch(authenticate())
//     }

// }

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(startLoading());

        if(authMode === 'signup'){
            firebase
                .auth()
                .createUserWithEmailAndPassword(authData.email, authData.password)
                .then(user => {
                    dispatch(stopLoading());
                    console.log(user);
                    startMainTabs();
                })
                .catch(err => {
                    dispatch(stopLoading());
                    alert(err);
                    console.log(err);
                });    
        }else if(authMode === 'login'){
            firebase
              .auth()
              .signInWithEmailAndPassword(authData.email, authData.password)
              .then(user => {
                dispatch(stopLoading());
                console.log(user);
                startMainTabs();
              })
              .catch(err => {
                dispatch(stopLoading());
                alert(err);
                console.log(err);
              });    
        }

    }
}

export const autoSignIn = () => {
    return dispatch => {
        if (firebase.auth().currentUser) {
            startMainTabs();
            console.log('User signed in!');
        }else {
            console.log('No User!');
        }
    }
}