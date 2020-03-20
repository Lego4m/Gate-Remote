import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Text, TextInput, Keyboard, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSafeArea } from 'react-native-safe-area-context';
import { storeInAsyncStorage, getFromAsyncStorage } from '../../services/AsyncStorageService';
import styles from "./styles";

function Settings(){
    const insets = useSafeArea();
    const [ip, setIP] = useState('');
    const [pass, setPass] = useState('');
    const [secureText, setSecureText] = useState({state: true, icon: "eyeo"});
    const [colorSave, setColorSave] = useState('#35AAFF');

    useEffect(() => {
        async function retrieveIP(){
            setIP(await getFromAsyncStorage('ip'));
        }

        retrieveIP();
    }, []);

    async function restoreIP(){
        setIP('192.168.0.90');
    }

    async function storeData(type, content){
        Vibration.vibrate(50);
        await storeInAsyncStorage(type, content) ? setColorSave('#35AAFF') : setColorSave('#ff3535');  
        Keyboard.dismiss();
    }

    function showHidePass(){
        secureText.state ? setSecureText({state: false, icon: "eye"}) : setSecureText({state: true, icon: "eyeo"})
    }
    
    return(
        <>
        <KeyboardAvoidingView 
            style={[styles.background, {paddingTop: insets.top}]}
            behavior={"padding"}
        >

            <View style={styles.container}>

                <View style={{flexDirection: "row"}}>

                    <Icon name={'reload1'} size={35} color={'#35AAFF'} onPress={restoreIP} />
                    <TextInput 
                        style={styles.input}
                        keyboardType={"numeric"}
                        placeholder="Endereço"
                        value={ip}
                        onChangeText={setIP}
                    />
                    <Icon name={'save'} size={40} color={colorSave} onPress={()=>{storeData('ip', ip)}} />
                    
                </View>

                <View style={{flexDirection: "row", marginTop: 20}}>

                    <Icon name={secureText.icon} size={35} color={'#35AAFF'} onPress={showHidePass} />
                    <TextInput 
                        style={styles.input}
                        secureTextEntry={secureText.state}
                        autoCorrect={false}
                        autoCapitalize={"none"}
                        placeholder="Senha"
                        value={pass}
                        onChangeText={setPass}
                    />
                    <Icon name={'save'} size={40} color={colorSave} onPress={()=>{storeData('pass', pass)}} />

                </View>

            </View>

        </KeyboardAvoidingView>

        <Text style={styles.creditsText}>Gate Remote - Leonardo A. Maron</Text>
        </>
    );
}

export default Settings;