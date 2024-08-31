import React, { useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '@/_UIHOOKS_';
import jssdk from '@htyf-mp/js-sdk';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
import tw from 'twrnc';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { downloadVideo } from './download';

function App() {
  const isFocused = useIsFocused();
  const { top, bottom } = useSafeAreaInsets()
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const router = useRoute();
  const apps = useAppSelector(i => i.apps)
  const navigation = useNavigation();
  return <View style={tw`pt-[${top}px] pb-[${bottom}px] bg-black`}>
    {/* <Text>details: {JSON.stringify(router)}</Text> */}
    <TouchableOpacity
      style={tw`absolute z-20 top-[${top}px] left-[10px] justify-center items-center`}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Text style={tw`text-white`}>返回</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={tw`absolute z-20 top-[${top + 50}px] left-[10px] justify-center items-center px-[5px] py-[2px] bg-[rgba(0,0,0,0.3)]`}
      disabled={loading}
      onPress={() => {
        setLoading(true)
        // @ts-ignore
        downloadVideo(`${router?.params?.url}`,
          // @ts-ignore
          `${router?.params?.name}`,
          (err, file) => {
            if (err) {
              Alert.alert('错误', err);
            } else {
              Alert.alert('保在成功', file);
            }
            setLoading(false)
          })
      }}
    >
      <Text style={tw`text-white`}>
        {loading ? '正在下载中' : '下载'}
      </Text>
    </TouchableOpacity>
    <View style={tw`flex-grow`}>
      {
        isFocused ? <Video
          resizeMode="contain"
          style={tw`w-full h-full`}
          controls
          // @ts-ignore
          source={{ uri: router?.params?.url }}
        /> : undefined
      }
    </View>
  </View>;
}

export default App;
