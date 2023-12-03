import {useEffect, useState} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  requestNotifications,
  Permission,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

const usePermission = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  const requestUserPermissionForFCM = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('fcm token:', fcmToken);
      console.log('Authorization status:', authStatus);
    } else {
      console.log('fcm auth fail');
    }
  };

  useEffect(() => {
    requestUserPermissionForFCM();
  });

  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        setFcmToken(token);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onTokenRefresh(token => {
      setFcmToken(token);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  //* 권한 요청 함수
  const requestPermission = async (permission: Permission) => {
    const result = await request(permission);
    if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
      const permissionName = permission.split('.').pop(); // 권한 이름 추출
      Alert.alert(
        `${permissionName} 권한 필요`,
        `이 앱에서는 ${permissionName} 기능을 사용하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.`,
        [
          {text: '설정으로 이동', onPress: () => Linking.openSettings()},
          {text: '취소', style: 'cancel'},
        ],
      );
    }
  };

  //* 특정 권한 확인 및 요청
  const checkAndRequestSpecificPermission = async (
    permission: Permission | undefined,
  ) => {
    if (permission) {
      const result = await check(permission);
      if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        requestPermission(permission);
      }
    }
  };

  //* 알림 권한 요청
  useEffect(() => {
    requestNotifications(['alert', 'sound']).then(({status}) => {
      if (status === 'denied' || status === 'blocked') {
        Alert.alert(
          '알림 권한 필요',
          '알림을 받기 위해 권한이 필요합니다. 설정에서 알림 권한을 허용해주세요.',
          [
            {text: '설정으로 이동', onPress: () => Linking.openSettings()},
            {text: '취소', style: 'cancel'},
          ],
        );
      }
    });
  }, []);

  //* 위치 권한 요청
  useEffect(() => {
    const locationPermission: Permission | undefined = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
    });
    checkAndRequestSpecificPermission(locationPermission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //* 카메라 권한 요청
  useEffect(() => {
    const cameraPermission: Permission | undefined = Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    });
    checkAndRequestSpecificPermission(cameraPermission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default usePermission;
