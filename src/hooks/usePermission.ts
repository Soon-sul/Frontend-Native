import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

const usePermission = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      const {status} = await requestNotifications(['alert', 'sound']);
      if (status === 'denied' || status === 'blocked') {
        Alert.alert(
          '알림 권한 필요',
          '알림을 받기 위해 권한이 필요합니다. 설정에서 알림 권한을 허용해주세요.',
          [
            {
              text: '설정으로 이동',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      }
    };

    const checkAndRequestPermission = async () => {
      if (Platform.OS === 'ios') {
        // iOS 알림 권한 확인 및 요청 로직
        checkNotifications().then(({status}) => {
          if (status === 'denied' || status === 'blocked') {
            requestNotificationPermission();
          }
        });
      } else if (Platform.OS === 'android') {
        // 안드로이드에서는 사용자가 앱의 알림을 차단했는지 확인합니다.
        checkNotifications().then(({status}) => {
          if (status === 'denied' || status === 'blocked') {
            Alert.alert(
              '알림 차단됨',
              '앱의 알림이 차단되었습니다. 설정에서 알림을 허용해주세요.',
              [
                {
                  text: '설정으로 이동',
                  onPress: () => Linking.openSettings(),
                },
                {
                  text: '취소',
                  style: 'cancel',
                },
              ],
            );
          }
        });
      }
    };

    checkAndRequestPermission();
  }, []);

  useEffect(() => {
    const requestPermission = async (permission: any) => {
      const result = await request(permission);
      if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        Alert.alert(
          '이 앱은 위치 권한 허용이 필요합니다.',
          '위치 권한을 허용해주세요.',
          [
            {
              text: '확인',
              onPress: () => requestPermission(permission),
            },
            {
              text: '취소',
              onPress: () => console.log('Permission denied'),
              style: 'cancel',
            },
          ],
        );
      }
    };

    if (Platform.OS === 'android') {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          }
        })
        .catch(console.error);
    } else if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.LOCATION_ALWAYS)
        .then(result => {
          if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
            requestPermission(PERMISSIONS.IOS.LOCATION_ALWAYS);
          }
        })
        .catch(console.error);
    }
  }, []);
};

export default usePermission;
