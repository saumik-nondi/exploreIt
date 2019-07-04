import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import React, { Component } from 'react';

import AuthScreen from './src/screens/Auth/Auth';
import FindPlace from './src/screens/FindPlace/FindPlace';
import SharePlace from './src/screens/SharePlace/SharePLace';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail';
import SideMenu from './src/screens/SideMenu/SideMenu';
import configureStore from './src/store/store/configureStore';

const store = configureStore();

class AuthHOC extends Component {
  render(){
    return(
      <Provider store={store}>
        <AuthScreen />
      </Provider>
    )
  }
}
class SharePlaceHOC extends Component {
  render(){
    return(
      <Provider store={store}>
        <SharePlace />
      </Provider>
    )
  }
}
class FindPlaceHOC extends Component {
  render(){
    return(
      <Provider store={store}>
        <FindPlace />
      </Provider>
    )
  }
}

class PlaceDetailHOC extends Component {
  render(){
    return(
      <Provider store={store}>
        <PlaceDetail inheritedProps={this.props}/>
      </Provider>
    )
  }
}

Navigation.registerComponent(
  'exploreit.AuthScreen', 
  () => AuthHOC, 
);

Navigation.registerComponent(
  'exploreit.SharePlace', 
  () => SharePlaceHOC, 
);

Navigation.registerComponent(
  'exploreit.FindPlace', 
  () => FindPlaceHOC, 
);

Navigation.registerComponent(
  'exploreit.PlaceDetail',
  () => PlaceDetailHOC
)

Navigation.registerComponent(
  'exploreit.SideMenu',
  () => SideMenu
)


// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'exploreit.AuthScreen',
//     title: 'Login'
//   }
// })

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        id: 'authScreen',
        name: 'exploreit.AuthScreen'
      }
    }
  })
})


// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import { connect } from 'react-redux';

// import InputContainer from './src/components/InputPlace/InputContainer.js';
// import ListContainer from './src/components/ListItem/ListContainer.js';
// import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'
// import {
//   addPlace,
//   deletePlace,
//   selectPlace,
//   deselecPlace
// } from './src/store/actions/index'

// class App extends React.Component {
//   state = {
//     placeName : ''
//   }

//   handleTextInput = (value) => {
//     this.setState({
//       placeName: value
//     })
//   }

//   handleButtonPress = () => {
//     if (this.state.placeName.trim() === '')
//       return;
//     else {
//       this.props.onAddPlace(this.state.placeName);
//     }
//   }

//   handleItemSelected = (key) => {
//     this.props.onSelectPlace(key);
//   }

//   onItemDelete = () => {
//     this.props.onDeletePlace();
//   }

//   onModalClose = () => {
//     this.props.onDeselectPlace();
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <PlaceDetail 
//           selectedItem = {this.props.selectedItem}
//           onItemDelete = {this.onItemDelete} 
//           onModalClose = {this.onModalClose}
//         />
//         <InputContainer 
//           placeName={this.state.placeName}
//           handleTextInput={this.handleTextInput}
//           handleButtonPress={this.handleButtonPress}
//         />
//         <ListContainer
//           places={this.props.places}
//           onItemSelected={this.handleItemSelected}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding : 20,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
// });

// const mapStateToProps = (state) => ({
//   places : state.places.places,
//   selectedItem : state.places.selectedItem
// })

// const mapDispatchToProps = (dispatch) => ({
//   onAddPlace : (name) => dispatch(addPlace(name)),
//   onDeletePlace : () => dispatch(deletePlace()),
//   onSelectPlace : (key) => dispatch(selectPlace(key)),
//   onDeselectPlace : () => dispatch(deselecPlace())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(App);
