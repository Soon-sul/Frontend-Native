/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef} from 'react';

import {SafeAreaView} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

function App(): JSX.Element {
  const webviewRef = useRef<WebView | null>(null);
  const site = 'https://soonsool.vercel.app';

  const userAgent =
    'Mozilla/5.0 (Linux; Android 12; Pixel a5 Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.130 Mobile Safari/537.36';

  const handleSetRef = (ref: WebView | null) => {
    webviewRef.current = ref;
  };

  const handleOnMessage = ({nativeEvent}: WebViewMessageEvent) => {
    const {data} = nativeEvent;
    console.log(data);
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <WebView
          source={{uri: site}}
          userAgent={userAgent}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          onMessage={handleOnMessage}
          allowsBackForwardNavigationGestures
          ref={handleSetRef}
        />
      </SafeAreaView>
    </>
  );
}

export default App;
