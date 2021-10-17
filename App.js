/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  PanResponder
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { RNCamera, FaceDetector } from 'react-native-camera';
import { scaleLinear } from 'd3-scale';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import OverlayPicker from './screens/components/OverlayPicker';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.dragScaleX = scaleLinear()
    this.state = {
      imgPathList: [
        '',
        require('./assets/1.jpg'),
        require('./assets/2.jpg'),
        require('./assets/3.jpg'),
        require('./assets/4.jpg'),
        require('./assets/5.jpg'),
        require('./assets/6.jpg'),
        require('./assets/7.jpg'),
        require('./assets/8.jpg'),
        require('./assets/9.jpg'),
        require('./assets/10.jpg'),
        require('./assets/11.jpg'),
        require('./assets/12.jpg'),
        require('./assets/13.jpg'),
        require('./assets/14.jpg'),
        require('./assets/15.jpg'),
        require('./assets/16.jpg'),
        require('./assets/17.jpg'),
        require('./assets/18.jpg'),
        require('./assets/19.jpg'),
      ],
      selectedImgPath: '',
      opacity: 0.5,
      height: 600,
      width: 376,
    }
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, {x0, y0}) => {
          const { width, height } = this.state;
          this.dragScaleX
              .domain([-x0, width-x0])
              .range([-1, 1]);
      },

      onPanResponderMove: (e) => {
          // console.log('dx is:', dx);
          // this.setState({
          //     opacity: 1 + this.dragScaleX(dx),
          // });
          const {locationX, locationY} = e.nativeEvent;
          // console.log('locationX is', locationX)
          this.setState({
            opacity: locationX / 355
          })
      },

      onPanResponderRelease: (ev, {vx, vy}) => {
          // console.log('released');
      }
    });
  }

  clickImgPicker = (imgPath) => {
    this.setState({
      selectedImgPath: imgPath
    })
  }
  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5 };
      const data = await this.camera.takePictureAsync(options);
      // console.log(data.uri);
      CameraRoll.saveToCameraRoll( data.uri )
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
  }
  render() {
    console.log(this.state.opacity);
    const { opacity } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 3, backgroundColor: 'white' }}>
          <View style={{marginTop: 40}}>
            <ScrollView
              horizontal={true}
              showHorizontalScrollIndicator={false}
            >
            {
              this.state.imgPathList.map((item, index) =>
                <OverlayPicker
                  imgPath={item}
                  key={index}
                  onPress={(img) => this.clickImgPicker(img)} />
              )
            }
            </ScrollView>
          </View>
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
      <View style={{position: 'absolute', top: 158, left: 0, right: 0, bottom: 0}} {...this._panResponder.panHandlers}>
          {
            this.state.selectedImgPath.length == 0 ? null :
            <Image
              style={{width: 376, height: 422, opacity: opacity}}
              source={this.state.selectedImgPath}
            />
          }
        </View>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;
