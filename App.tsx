import React from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import {onMessage} from './src/Share';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <WebView
        source={{uri: 'https://f9f6-211-197-13-149.ngrok-free.app'}}
        onMessage={onMessage}
        injectedJavaScript={`window.share = function() { window.ReactNativeWebView.postMessage('share:' + window.location.href); }; true;`}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView>
  );
};

export default App;
