import {Share} from 'react-native';

const shareUrl = async (url: string) => {
  try {
    await Share.share({
      message: url,
    });
  } catch (error) {
    console.error(error);
  }
};

export const onShareMessage = (event: any) => {
  const {data} = event.nativeEvent;
  if (data.startsWith('share:')) {
    const url = data.substring(6);
    shareUrl(url);
  }
};
