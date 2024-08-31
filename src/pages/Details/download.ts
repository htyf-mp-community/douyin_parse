import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import RNFetchBlob from 'react-native-blob-util';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import md5 from 'md5';

async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else {
    // 对于 iOS 或其他平台，你可以直接返回 true 或做其他权限处理
    return true;
  }
}

export async function downloadVideo(url: string, name: string, callback?:(error?: any, data?: any) => void) {
  const hasPermission = await requestStoragePermission();
  
  if (!hasPermission) {
    console.log('Permission denied');
    callback && callback('Permission denied');
    return;
  }

  const { config, fs } = RNFetchBlob;
  const filePath = `${fs.dirs.DownloadDir}/video_${md5(url)}_${name}`;

  config({
    fileCache: true,
    path: filePath,
  })
    .fetch('GET', url)
    .then((res) => {
      console.log('The file saved to ', res.path());
      saveVideoToGallery(res.path(), callback);
    })
    .catch((error) => {
      console.error('Error downloading video:', error);
      callback && callback('Error downloading video');
    });
}

async function saveVideoToGallery(filePath: string, callback?:(error?: any, data?: any) => void) {
  try {
    // const data = await CameraRoll.saveToCameraRoll(`file://${filePath}`, 'auto')
    // if (data) {

    // }
    callback && callback(undefined, filePath);
  } catch (error) {
    callback && callback(error);
  }
}