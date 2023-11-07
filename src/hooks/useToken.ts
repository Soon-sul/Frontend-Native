import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';

const useToken = webviewRef => {
  const sendMessageToWebView = token => {
    const message = {
      type: 'device_token',
      token: token,
    };
    const script = `window.postMessage(${JSON.stringify(message)}, '*');`;
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript(script);
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        //* 장치가 원격 메시지 등록되지 않았다면 등록
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        //* FCM 토큰 가져오기
        const token = await messaging().getToken();
        //* 웹뷰에 토큰 전송
        sendMessageToWebView(token);
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error', error.message);
        }
      }
    };

    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useToken;
