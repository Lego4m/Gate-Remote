import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { storeInAsyncStorage } from '../../services/AsyncStorageService';
import styles from "./styles";

function Settings(){
    const insets = useSafeArea();
    const [pass, setPass] = useState('');

    async function storeData(){
        await storeInAsyncStorage('pass', pass);
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

            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                placeholder="Senha"
                value={pass}
                onChangeText={setPass}
            />

            <TouchableOpacity style={styles.button} onPress={storeData} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

        </View>

        <Text style={styles.creditsText}>Criado por Leonardo A. Maron</Text>
        </>
    );
}

export default Settings;