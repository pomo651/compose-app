import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";

class OverlayPicker extends Component {
    render() {
        const { onPress, imgPath } = this.props;
        return (
          <View style={{height: 100, width: 100, marginLeft: 10}}>
            <TouchableOpacity
              style={{ flex: 1, }}
              onPress={() => {onPress(imgPath)}}>
              <Image source={imgPath.length == 0 ? require('../../assets/0.jpg') : imgPath}
                     style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
              />
            </TouchableOpacity>
          </View>
        );
    }
}
export default OverlayPicker;
