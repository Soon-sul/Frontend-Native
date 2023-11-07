<<<<<<< HEAD
import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import usePermission from './src/hooks/usePermission';

function App(): JSX.Element {
  const webviewRef = useRef<WebView | null>(null);
  usePermission();
  const site = 'https://soonsool.vercel.app';

=======
import React, {useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView, WebViewMessageEvent} from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
PushNotification.configure({
  // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
  onRegister: function (token: any) {
    console.log('TOKEN:', token);
  },

  // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
  onNotification: function (notification: any) {
    console.log('NOTIFICATION:', notification);
    // process the notification

    // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) 등록한 액션을 누렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
  onAction: function (notification: any) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err: Error) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
PushNotification.createChannel(
  {
    channelId: 'activity',
    channelName: '활동 알림',
    channelDescription: '앱 실행하는 알림',
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  created => console.log(`createChannel activity returned '${created}'`),
);

function App(): JSX.Element {
  const webviewRef = useRef<WebView | null>(null);
  // const site = 'https://soonsool.vercel.app';
  const site = 'https://4cbf-211-197-13-149.ngrok-free.app';
>>>>>>> main
  const handleSetRef = (ref: WebView | null) => {
    webviewRef.current = ref;
  };

  const handleOnMessage = ({nativeEvent}: WebViewMessageEvent) => {
    const {data} = nativeEvent;
    console.log(data);
  };

  const sendMessageToWebView = (token: string) => {
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
    async function getToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();
        sendMessageToWebView(token);
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error', error.message);
        }
      }
    }

    getToken();
  }, []);

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
