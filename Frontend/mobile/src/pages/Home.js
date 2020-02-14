import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeArea } from 'react-native-safe-area-context';

function Home(){
    const insets = useSafeArea();
    let webview;

    

    return(
        <View style={{flex: 1, marginTop: insets.top, backgroundColor: '#191919'}}>
            <WebView source={{uri: "http://192.168.0.90"}} ref={ref => (webview = ref)} />
        </View>
    );
}

export default Home;