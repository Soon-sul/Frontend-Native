import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
// import Geolocation from '@react-native-community/geolocation';
// import {onShareMessage} from './src/utils/Share';

const App = () => {
  const webviewRef = useRef(null);

  // const onMessage = (event: any) => {
  //   const {data} = event.nativeEvent;
  //   if (data.startsWith('share:')) {
  //     onShareMessage(event);
  //   } else if (data === 'request_location') {
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         const {latitude, longitude} = position.coords;
  //         webviewRef.current.postMessage(JSON.stringify({latitude, longitude}));
  //       },
  //       error => console.log(error),
  //       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //     );
  //   }
  // };

  const onMessage = () => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <WebView
        ref={webviewRef}
        source={{
          uri: 'https://76c9-211-197-13-149.ngrok-free.app',
        }}
        onMessage={onMessage}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView>
  );
};

export default App;
