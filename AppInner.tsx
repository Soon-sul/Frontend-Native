import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView, BackHandler} from 'react-native';
import WebView from 'react-native-webview';
import usePermission from './src/hooks/usePermission';
import useToken from './src/hooks/useToken';
import Config from 'react-native-config';

const AppInner = () => {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const BASE_URL = Config.BASE_URL;

  usePermission();
  useToken(webviewRef);

  useEffect(() => {
    const backAction = () => {
      if (webviewRef.current && canGoBack) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [canGoBack]);

  const handleOnMessage = event => {
    const {data} = event.nativeEvent;
    if (data === 'navigationStateChange') {
      setCanGoBack(event.nativeEvent.canGoBack);
    }
    console.log(data);
  };

  const handleSetRef = _ref => {
    webviewRef.current = _ref;
  };

  const injectedJavaScript = `
    (function() {
      function wrap(fn) {
        return function wrapper() {
          var res = fn.apply(this, arguments);
          window.ReactNativeWebView.postMessage('navigationStateChange');
          return res;
        }
      }

      history.pushState = wrap(history.pushState);
      history.replaceState = wrap(history.replaceState);
      window.addEventListener('popstate', function() {
        window.ReactNativeWebView.postMessage('navigationStateChange');
      });
    })();

    true;
  `;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <WebView
        source={{uri: BASE_URL}}
        ref={handleSetRef}
        onMessage={handleOnMessage}
        injectedJavaScript={injectedJavaScript}
        originWhitelist={['https://*', 'http://*', 'file://*', 'sms://*']}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowsBackForwardNavigationGestures
      />
    </SafeAreaView>
  );
};

export default AppInner;
