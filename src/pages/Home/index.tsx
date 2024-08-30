import React, { useCallback, useState } from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
import { useAppSelector } from '@/_UIHOOKS_';
import { useNavigation } from '@react-navigation/native';
import jssdk from '@htyf-mp/js-sdk';
import tw from 'twrnc';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';

function App() {
  const { top, bottom } = useSafeAreaInsets()
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const getData = useCallback(async () => {
    return new Promise(async resolve => {
      setLoading(true);
      try {
        Keyboard.dismiss()
        if (jssdk) {
          const host = `https://www.jiexiapi.top/`;
          const jsCrawler = `function(callback) {
          var text = '${text}'
          // 设置 section-heading 的 input 值
          const sectionHeadingInput = document.querySelector('.section-heading input')
          sectionHeadingInput.value = text;
          const event = new Event('change', { bubbles: true });
          sectionHeadingInput.dispatchEvent(event);
          setTimeout(function(){
            // 点击 button-btn 按钮
            document.querySelector('.button-btn').click();
          }, 300);
          // 轮询查找 down-btn 元素，并获取 href 和 download 属性
          const pollForElement = () => {
              const downBtn = document.querySelector('.down-btn a');
              if (downBtn) {
                  const hrefValue = downBtn.getAttribute('href');
                  const downloadValue = downBtn.getAttribute('download');
                  console.log('href:', hrefValue);
                  console.log('download:', downloadValue);
                  callback(undefined, JSON.stringify({
                    url: hrefValue,
                    name: downloadValue
                  }))
              } else {
                  // 如果元素还不存在，100ms 后再尝试
                  setTimeout(pollForElement, 500);
              }
          };

          // 开始轮询
          pollForElement();
        }`;
          let data = await jssdk?.puppeteer({
            url: `${host}`,
            jscode: `${jsCrawler}`,
            debug: false,
            wait: 3000,
            timeout: 1000 * 30,
            callback: () => { },
          });
          try {
            let obj = JSON.parse(data);
            // @ts-ignore
            navigation.navigate('Details', {
              url: obj?.url || '',
              name: obj?.name || '',
            });
          } catch (error) {
            Alert.alert('错误')
          }
        }
      } catch (error) {

      } finally {
        resolve(true);
        setLoading(false);
      }
    });
  }, [text]);

  return <View style={{
    flex: 1,
    flexDirection: 'column'
  }}>
    <View style={tw`pt-[${top}px] justify-center items-center`}>
      <Text style={tw`text-[20px]`}>短视频解析下载</Text>
    </View>
    <View style={tw`flex-grow justify-center items-center px-[15px] gap-[10px]`}>
      <View style={tw`flex-row w-full border-[1px] border-[#000] rounded-[4px] overflow-hidden`}>
        <View style={tw`flex-grow w-0`}>
          <TextInput
            style={tw`w-full h-[45px] px-[6px]`}
            placeholder='请输入分享链接'
            value={text}
            onChangeText={(text) => {
              setText(text)
            }}
            clearButtonMode="always"
            onEndEditing={() => {
              getData();
            }}
          />
        </View>
        <TouchableOpacity
          disabled={loading}
          style={tw`flex-shrink w-[50px] h-[45px] justify-center items-center`}
          onPress={async () => {
            const text = await Clipboard.getString();
            setText(text);
          }}
        >
          <Text>粘贴</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          style={tw`flex-shrink w-[80px] h-[45px] justify-center items-center`}
          onPress={() => {
            getData();
          }}
        >
          <Text>立即下载</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`h-[50px] justify-center items-center`}>
        {
          loading ? <View style={tw`flex-row justify-center items-center gap-[5px]`}>
            <ActivityIndicator size="small" />
            <Text>正在解析中，请等待....</Text>
          </View> : undefined
        }
      </View>
    </View>
  </View>;
}

export default App;
