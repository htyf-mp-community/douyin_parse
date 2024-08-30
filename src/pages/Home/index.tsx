import React from 'react';
import { Button, Image, Text, View } from 'react-native';
import { useAppSelector } from '@/_UIHOOKS_';
import { useNavigation } from '@react-navigation/native';

function App() {
  const apps = useAppSelector(i => i.apps)
  const navigation = useNavigation();
  return <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }}>
    <Text>短视频解析下载</Text>
    <Text>appid: {apps.__APPID__}</Text>
    <Text>version: {apps.__VERSION__}</Text>
    <Text>build time: {apps.__BUILD_TIME__}</Text>
  </View>;
}

export default App;
