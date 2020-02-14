import React from 'react';
import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

function Settings(){
    const insets = useSafeArea();

    return(
        <View style={{flex: 1, marginTop: insets.top, backgroundColor: '#191919'}}>

        </View>
    );
}

export default Settings;