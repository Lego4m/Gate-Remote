import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

import defaultIp from '../../utils/defaultIp';

import styles from './styles';

export default function Settings(){
    const [ip, setIp] = useState('');
    const [pass, setPass] = useState('');

    const [secureText, setSecureText] = useState({ state: true, icon: "eyeo" });
    
    const [save1Color, setSave1Color] = useState("#35AAFF");
    const [save2Color, setSave2Color] = useState("#35AAFF");

    useEffect(()=>{
        AsyncStorage.getItem('ip').then(content => {
            setIp(content || defaultIp);
        });
    }, []);

    function showHidePass(){
        secureText.state ? setSecureText({ state: false, icon: "eye" }) : setSecureText({ state: true, icon: "eyeo" });
    }

    async function storeIp(){
        if (ip.length < 8){
            setSave1Color('#ff3535');
        } else {
            await AsyncStorage.setItem('ip', ip);
            setSave1Color('#04ff00');
            Keyboard.dismiss();
        }
    }

    async function storePass(){
        if (pass.length < 6){
            setSave2Color('#ff3535');
        } else {
            await AsyncStorage.setItem('pass', pass);
            setSave2Color('#04ff00');
            Keyboard.dismiss();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>

                <TouchableOpacity activeOpacity={0.6} onPress={()=>{setIp(defaultIp)}}>
                    <AntDesign name={'reload1'} size={35} color={'#35AAFF'} />
                </TouchableOpacity>

                    <TextInput
                        style={styles.textInput} 
                        placeholder="Endereço"
                        keyboardType="numeric"
                        value={ip}
                        onChangeText={setIp}
                    />

                <TouchableOpacity activeOpacity={0.6} onPress={storeIp}>
                    <AntDesign name={'save'} size={40} color={save1Color} />
                </TouchableOpacity>

            </View>

            <View style={[styles.inputGroup, { marginTop: 20 }]}>

                <TouchableOpacity activeOpacity={0.6} onPress={showHidePass}>
                    <AntDesign name={secureText.icon} size={35} color={'#35AAFF'} />
                </TouchableOpacity>

                    <TextInput 
                        style={styles.textInput}
                        placeholder="Senha"
                        secureTextEntry={secureText.state}
                        value={pass}
                        onChangeText={setPass}
                    />

                <TouchableOpacity activeOpacity={0.6} onPress={storePass}>
                    <AntDesign name={'save'} size={40} color={save2Color} />
                </TouchableOpacity>

            </View>
        </View>
    )
}