import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Mapbox from "@mapbox/react-native-mapbox-gl";

import ButtonBasic from '../UI/ButtonBasic/ButtonBasic';

Mapbox.setAccessToken(
  "pk.eyJ1IjoicmFraWJoYXNhbjQ4IiwiYSI6ImNqcTJvampwaTE2dnU0M3RkZ3IyMGQzeHcifQ.Q6gKI2ncGEsJnqCFoTY_rw"
);

class MapComponent extends Component {
    componentWillMount = () => {
        this.reset();
    }

    reset = () => {
        this.setState({
            focusedLocation: {
                latitude: 22.341900,
                longitude: 91.815536
            }
        })
    }

    constructor(props){
        super(props);

        this.onMapPressHandler = this.onMapPressHandler.bind(this);
    }

    renderAnnotations() {
        return (
        <Mapbox.PointAnnotation
            key="pointAnnotation"
            id="pointAnnotation"
                coordinate={this.props.location ?
                    [this.props.location.longitude, this.props.location.latitude] :
                    [this.state.focusedLocation.longitude, this.state.focusedLocation.latitude]
                }
        >
            <View style={styles.annotationContainer}>
                <View style={styles.annotationFill} />
            </View>
            {/* <Mapbox.Callout title="Look! An annotation!" /> */}
        </Mapbox.PointAnnotation>
        );
    }

    updateLocationState = ( lat, long ) => {
        this.setState({
            focusedLocation: {
                latitude: lat,
                longitude: long
            }
        })
    }

    componentWillMount(){
        if(this.props.location){
            this.updateLocationState(this.props.location.latitude, this.props.location.longitude)
        }
    }


    async onMapPressHandler(event) {
        const { geometry } = event;
        const latitude = geometry.coordinates[1];
        const longitude = geometry.coordinates[0];

        await this.map.flyTo([longitude, latitude], 600);
        await this.map.zoomTo(16);
        
        this.updateLocationState(latitude, longitude);
        
        this.props.onLocationPick({
            latitude,
            longitude
        })
    }

    getUserLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                geometry: {
                    coordinates: [
                        pos.coords.longitude,
                        pos.coords.latitude
                    ]
                }
            };
            this.onMapPressHandler(coordsEvent);
        },
        err => {
            console.log(err);
            alert('Location could not be fetched! Please pick manually.')
        }
        )
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={[
            this.props.style, styles.mapContainer
            ]}>
          <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Street}
            zoomLevel={16}
            ref={(ref) => (this.map = ref)}
            centerCoordinate={
                this.props.location ? 
                [this.props.location.longitude, this.props.location.latitude] :
                [this.state.focusedLocation.longitude, this.state.focusedLocation.latitude]
            }
            style={styles.mapContainer}
            showUserLocation={true}
            onLongPress={this.onMapPressHandler} 
          >
            {this.renderAnnotations()}
          </Mapbox.MapView>
        </View>
        <ButtonBasic onPress={this.getUserLocationHandler} color="#3462F7">Locate Me</ButtonBasic>
      </View>
    );
  }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: '#eee',
        height: 220,
    }
})

export default MapComponent;