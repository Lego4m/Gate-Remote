import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeArea } from 'react-native-safe-area-context';
import { getFromAsyncStorage, emitter } from '../services/AsyncStorageService';

function Home(){
    const insets = useSafeArea();
    const [pass, setPass] = useState('');
    let webview;

    emitter.on('pass', retrieveData);

    async function retrieveData() {
        setPass(await getFromAsyncStorage('pass'))
    }
    
    useEffect(() => {
        webview.injectJavaScript(`pw = "${pass}"`);
    }, [pass])
    
    return(
        <View style={{flex: 1, paddingTop: insets.top, backgroundColor: '#191919'}}>
            <WebView source={{uri: "http://192.168.0.90/mobile"}} ref={ref => (webview = ref)} onLoadEnd={retrieveData} />
        </View>
    );
}

export default Home;