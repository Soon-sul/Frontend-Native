import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import usePermission from './src/hooks/usePermission';

function App(): JSX.Element {
  const webviewRef = useRef<WebView | null>(null);
  usePermission();
  // const site = 'https://soonsool.vercel.app';
  const site =
    'https://cb19-2001-e60-8702-b39c-a160-8483-8c0e-3a42.ngrok-free.app';

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
          userAgent="Mozilla/5.0 (Linux; Win64; x64; rv:46.0)r Gecko/20100101 Firefox/68.0"
          originWhitelist={['https://*', 'http://*', 'file://*', 'sms://*']}
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
