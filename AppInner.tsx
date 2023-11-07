import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';
import WebView, {WebViewMessageEvent} from 'react-native-webview';
import usePermission from './src/hooks/usePermission';
import useToken from './src/hooks/useToken';

const AppInner = () => {
  const webviewRef = useRef<WebView | null>(null);
  // const site = 'https://soonsool.vercel.app';
  const site = 'https://4cbf-211-197-13-149.ngrok-free.app';
  const handleSetRef = (ref: WebView | null) => {
    webviewRef.current = ref;
  };

  const handleOnMessage = ({nativeEvent}: WebViewMessageEvent) => {
    const {data} = nativeEvent;
    console.log(data);
  };

  usePermission();
  useToken(webviewRef);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <WebView
        source={{uri: site}}
        userAgent="Mozilla/5.0 (Linux; Win64; x64; rv:46.0)r Gecko/20100101 Firefox/68.0"
        originWhitelist={['https://*', 'http://*', 'file://*', 'sms://*']}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={handleOnMessage}
        allowsBackForwardNavigationGestures
        ref={handleSetRef}
      />
    </SafeAreaView>
  );
};

export default AppInner;
