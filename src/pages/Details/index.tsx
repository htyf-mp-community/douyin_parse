import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector } from '@/_UIHOOKS_';
import jssdk from '@htyf-mp/js-sdk';
import { useNavigation, useRoute } from '@react-navigation/native';
import Video from 'react-native-video';
import tw from 'twrnc';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function App() {
  const { top, bottom } = useSafeAreaInsets()
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
    <View style={tw`flex-grow`}>
      <Video
        resizeMode="contain"
        style={tw`w-full h-full`}
        controls
        // @ts-ignore
        source={{ uri: router?.params?.url }}
      />
    </View>
  </View>;
}

export default App;
