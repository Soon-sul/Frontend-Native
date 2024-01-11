import React, {useRef, useState, useEffect} from 'react';
import {SafeAreaView, BackHandler} from 'react-native';
import WebView from 'react-native-webview';
import usePermission from './src/hooks/usePermission';
import useToken from './src/hooks/useToken';
import {onShareMessage} from './src/utils/Share';
import {saveAccessToken} from './src/utils/SaveAccessToken';

const AppInner = () => {
  const webviewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

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

  const handleOnMessage = async (event: any) => {
    const {data} = event.nativeEvent;
    if (data === 'navigationStateChange') {
      setCanGoBack(event.nativeEvent.canGoBack);
    } else if (data.startsWith('share:')) {
      onShareMessage(event);
    } else if (data.startsWith('accessToken:')) {
      const accessToken = data.split(':')[1];
      saveAccessToken(accessToken);
    }
  };
  const handleSetRef = _ref => {
    webviewRef.current = _ref;
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     const storageData = await AsyncStorage.getItem('accessToken');
  //     if (storageData && storageData.length > 0) {
  //       webviewRef.current?.postMessage(storageData);
  //     }
  //   };
  //   // AsyncStorage에 저장된 데이터가 있다면, 불러온다.
  //   getData();
  // }, []);

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
        source={{uri: 'https://soonsool.vercel.app'}}
        ref={handleSetRef}
        onMessage={handleOnMessage}
        injectedJavaScript={injectedJavaScript}
        userAgent="Mozilla/5.0 (Linux; Win64; x64; rv:46.0)r Gecko/20100101 Firefox/68.0"
        originWhitelist={['https://*', 'http://*', 'file://*', 'sms://*']}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        allowsBackForwardNavigationGestures
      />
    </SafeAreaView>
  );
};

export default AppInner;
