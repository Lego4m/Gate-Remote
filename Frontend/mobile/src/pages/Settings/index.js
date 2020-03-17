import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Vibration } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { storeInAsyncStorage, getFromAsyncStorage } from '../../services/AsyncStorageService';
import styles from "./styles";

function Settings(){
    const insets = useSafeArea();
    const [ip, setIP] = useState('');
    const [pass, setPass] = useState('');

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
        await storeInAsyncStorage(type, content);
        Keyboard.dismiss();
    }
    
    return(
        <>
        <View 
            style={{
                flex: 1, 
                backgroundColor: '#191919', 
                paddingTop: insets.top,
                paddingBottom: 20,
                alignItems: "center", 
                justifyContent: 'center', 
            }}
        >

            <View style={styles.container}>

                <TextInput 
                    style={styles.input}
                    keyboardType={"numeric"}
                    placeholder="Endereço"
                    value={ip}
                    onChangeText={setIP}
                />

                <View style={{flexDirection: "row"}}>

                    <TouchableOpacity style={styles.buttonIP} onPress={restoreIP} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Restaurar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.buttonIP} 
                        onPress={() => {
                            Vibration.vibrate(50);
                            storeData('ip', ip);
                        }} 
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>

                </View>

            </View>

            <View style={styles.container}>

                <TextInput 
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Senha"
                    value={pass}
                    onChangeText={setPass}
                />

                <TouchableOpacity 
                    style={styles.buttonPass} 
                    onPress={() => {
                        Vibration.vibrate(50);
                        storeData('pass', pass);
                    }} 
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

            </View>



        </View>

        <Text style={styles.creditsText}>Criado por Leonardo A. Maron</Text>
        </>
    );
}

export default Settings;