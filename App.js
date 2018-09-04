import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer';

import config from './config'

import Result from './Components/Result';

console.disableYellowBox = true;

export default class App extends Component {
  state = {
    loading: false,
    result: {},
    hasScanned: false
  };
  render() {
    return (
      <View style={styles.container}>
        {
          (!this.state.hasScanned) ?
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}

              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}>

              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
                <TouchableOpacity
                  onPress={this.takePicture.bind(this)}
                  style={styles.capture}
                >
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            </RNCamera>

            : <Result result={this.state.result} />
        }
      </View>
    );
  }

  // takePicture() {
  //   if (!this.state.loading) {
  //     this.setState({
  //       loading: true,

  //     });
  //     const options = { quality: 0.5, base64: true };
  //     this.camera.takePictureAsync({ metadata: options })
  //       .then((data) => {
  //         resizeImage(data.path, (resizedImageUri) => {
  //           NativeModules.RNImageToBase64.getBase64String(resizedImageUri, async (err, base64) => {
  //             if (err) {
  //               console.error(err)
  //             }
  //             console.log('converted to base64');
  //             let result = await checkForText(base64);
  //             console.log(result);
  //             this.setState({ result: result })

  //             this.setState({
  //               loading: false,
  //               hasScanned: true

  //             });
  //           })
  //         })


  //       })
  //       .catch(err => console.error(err));
  //   } else {
  //     console.log('NO GO' + this.state.loading)
  //   }
  // }

  takePicture = async function () {
    if (!this.state.loading) {
      if (this.camera) {
        const options = { quality: 0.8, base64: true, height: 640, width: 480 };
        const data = await this.camera.takePictureAsync(options)
        console.log(data)
        let picture = data.base64;
        let result = await checkForText(picture)
        console.log(result)
        this.setState({ result: result })
        this.setState({
          loading: false,
          hasScanned: true
        })

      }
    }
  };
}
function resizeImage(path, callback, width = 640, height = 480) {
  ImageResizer.createResizedImage(path, width, height, 'JPEG', 85).then((resizedImageUri) => {
    callback(resizedImageUri);

  }).catch((err) => {
    console.error(err)
  });
}
async function checkForText(base64) {
  console.log(base64)
  return await
    fetch(config.googleCloud.api + config.googleCloud.apiKey, {
      method: 'POST',
      body: JSON.stringify({
        "requests": [
          {

            "image": {
              "content": base64
            },
            "features": [
              {
                "type": "DOCUMENT_TEXT_DETECTION"
              }
            ],

          }
        ]
      })
    }).then((response) => {
      return response.json();
    }, (err) => {
      console.error('promise rejected');
      console.error(err);
    });
}
const deviceHeight = Dimensions.get("window").height;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    margin: 50,
    height: 70,
    width: 70,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 15
  },

  spinner: {
    marginBottom: 50
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    borderLeftColor: 'rgba(0, 0, 0, .6)',
    borderRightColor: 'rgba(0, 0, 0, .6)',
    borderTopColor: 'rgba(0, 0, 0, .6)',
    borderBottomColor: 'rgba(0, 0, 0, .6)',
    borderLeftWidth: deviceWidth / 2,
    borderRightWidth: deviceWidth / 2,
    borderTopWidth: deviceHeight / 2,
    borderBottomWidth: deviceHeight / 10
  },
  rectangleColor: {
    height: 450,
    width: 150,
    backgroundColor: 'transparent'
  },
  topLeft: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    position: 'absolute',
    left: -2,
    top: -1,
    borderLeftColor: 'white',
    borderTopColor: 'white'
  },
  topRight: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    right: -1,
    top: -1,
    borderRightColor: 'white',
    borderTopColor: 'white'
  },
  bottomLeft: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    position: 'absolute',
    left: -1,
    bottom: -1,
    borderLeftColor: 'white',
    borderBottomColor: 'white'
  },
  bottomRight: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    right: -1,
    bottom: -1,
    borderRightColor: 'white',
    borderBottomColor: 'white'
  },
  cameraWrapper: {
    height: 300,
    width: 300
  }
});