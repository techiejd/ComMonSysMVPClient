import React, {Component} from 'react';
import { WebView } from 'react-native-webview';
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
function ShopsMapPrev() {
    return(
        // <MapView
        //         style={{ width:100, height:100 }}
        //         provider={PROVIDER_GOOGLE}
        //         initialRegion={{
        //         latitude: 37.78825,
        //         longitude: -122.4324,
        //         latitudeDelta: 0.0922,
        //         longitudeDelta: 0.0421}}
        // ></MapView>
        <WebView
            source={{
                uri: `
                <iframe width="100%" height="100%" src="http://www.weather.gov/" frameborder="0"></iframe>
                `,
            }}
            />
    )
}

class ShopsMapWebView extends Component {
    render() {
        return( <WebView source={{ uri: 'https://reactnative.dev/' }} />);
      }
}

export default function ShopsMaps() {
    return(<>
        <View
            style={{ width: 400, height:400}}
        >
            <WebView source={{html: '<iframe width="100%" height="100%" src="https://www.google.com/maps/d/embed?mid=1Gx28fiAtmIKgeVZo5GkTysyuBf_logAd&ehbc=2E312F" frameborder="0"></iframe>'}} />

        </View>
    </>)
}