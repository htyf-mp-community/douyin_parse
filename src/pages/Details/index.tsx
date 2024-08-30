import React from 'react';
import { Button, Text, View } from 'react-native';
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
  return <View style={tw`pt-[${top}px]`}>
    {/* <Text>details: {JSON.stringify(router)}</Text> */}
    <Button
      title='返回'
      onPress={() => {
        navigation.goBack();
      }}
    />
    <View>
      <Video
        style={tw`w-full h-[600px]`}
        controls
        // @ts-ignore
        source={{ uri: router?.params?.url }}
      />
    </View>
  </View>;
}

export default App;
