import { SET_PLACES, DELETE_PLACE, INCR_PLACE_ADDED } from './actionTypes';
import firebase from 'react-native-firebase';
import UUID from 'uuid/v4';
import { startLoading, stopLoading } from './index';

export const addPlace = (value, location, image) => {

    return dispatch => {
        dispatch(startLoading());

        const storage = firebase.storage();  
        const uuid = UUID();
        let placeData = { value, location };

        storage
          .ref(`/places/${uuid}`)
          .putFile(image.uri)
          .then(snapshot => {
            placeData.imageUrl = snapshot.downloadURL;
            placeData.imageRef = snapshot.ref;
            firebase.auth().currentUser.getIdToken()
            .then((token) => {
                fetch(
                  `https://exploreit-1545660813843.firebaseio.com/places.json?auth=${token}`,
                  {
                    method: "POST",
                    body: JSON.stringify(placeData)
                  }
                )
                  .then(res => res.json())
                  .then(parseRes => {
                    console.log("Uploaded!");
                    dispatch(stopLoading());
                    dispatch(incrementPlaceAdded());
                  })
                  .catch(err => {
                    console.log(err);
                    alert("An error occured!");
                    dispatch(stopLoading());
                  });
            })
          })
          .catch((err) => {
            console.log(err);
            alert('An error occured!');
            dispatch((stopLoading()));
          });

    };
}

export const incrementPlaceAdded = () => ({
    type: INCR_PLACE_ADDED
})

export const getPlaces = () => {
    return dispatch => {
        firebase.auth().currentUser.getIdToken()
            .then((token) => {
                fetch(`https://exploreit-1545660813843.firebaseio.com/places.json?auth=${token}`)
                    .then(res => res.json())
                    .then(parseRes => {
                        let places = [];
                        for (let key in parseRes) {
                            places.push({
                                ...parseRes[key],
                                image: {
                                    uri: parseRes[key].imageUrl,
                                    ref: parseRes[key].imageRef
                                },
                                key
                            })
                        }
                        dispatch(setPlaces(places))
                    })
                    .catch(err => {
                        console.log(err);
                        alert('An error occured!');
                    });
            })
            .catch(error => {
                alert('An error occured!');
                console.log(error);
            })
    }    
}

export const setPlaces = (places) => ({
    type: SET_PLACES,
    places: places
})

export const deletePlace = (key, imageRef) => {
    return dispatch => {
        firebase.storage().ref(imageRef).delete()
        .then(() => {
            firebase.auth().currentUser.getIdToken()
                .then((token) => {
                    fetch(`https://exploreit-1545660813843.firebaseio.com/places/${key}.json?auth=${token}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(parsedRes => {
                            dispatch(removePlace(key));
                            console.log('DELETED!')
                        })
                        .catch((err) => {
                            alert('Could not be deleted! Try again!')
                            console.log(err);
                        });
                });
        }) 
        .catch((err) => {
            alert('Could not be deleted! Try again!')
            console.log(err);
        })  
    }
}

export const removePlace = (key) => ({
    type: DELETE_PLACE,
    key
})