import React, { useState, useEffect } from 'react';
import { View, AsyncStorage } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeArea } from 'react-native-safe-area-context';

function Home(){
    const insets = useSafeArea();
    const [pass, setPass] = useState('');
    let webview;

    async function retrieveData() {
        try {
            setPass(await AsyncStorage.getItem('pass'));

            if (pass === null){
                setPass('admin');
            }
        } catch (e) {
            console.log(e);
        }
    }
    
    useEffect(() => {
        webview.injectJavaScript(`pw = "${pass}"`);
    }, [pass])
    

    return(
        <View style={{flex: 1, marginTop: insets.top, backgroundColor: '#191919'}}>
            <WebView source={{uri: "http://192.168.0.90/mobile"}} ref={ref => (webview = ref)} onLoadEnd={retrieveData} />
        </View>
    );
}

export default Home;