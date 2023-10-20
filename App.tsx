/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useEffect} from 'react';

import {SafeAreaView} from 'react-native';
import {BackHandler} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';

function App(): JSX.Element {
  const webviewRef = useRef<WebView | null>(null);

  const handleSetRef = (ref: WebView | null) => {
    webviewRef.current = ref;
  };

  const handleOnMessage = ({nativeEvent}: WebViewMessageEvent) => {
    const {data} = nativeEvent;
    console.log(data);
  };

  const onPressHardwareBackButton = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      onPressHardwareBackButton,
    );
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        onPressHardwareBackButton,
      );
    };
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <WebView
          source={{uri: 'https://soonsool.vercel.app'}}
          userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          onMessage={handleOnMessage}
          ref={handleSetRef}
        />
      </SafeAreaView>
    </>
  );
}

export default App;
