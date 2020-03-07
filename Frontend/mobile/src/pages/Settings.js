import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { storePasswordInAsyncStorage } from '../services/pw';

function Settings(){
    const insets = useSafeArea();
    const [pass, setPass] = useState('');

    async function storeData(){
        try{
            await storePasswordInAsyncStorage(pass);
            Keyboard.dismiss();
        } catch (e) {
            console.log(e);
        }
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

            <TouchableOpacity style={styles.button} onPress={storeData}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

        </View>

        <Text style={styles.creditsText}>Criado por Leonardo A. Maron</Text>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: '70%',
        padding: 10,
        marginBottom: 15,
        height: 40,
        textAlign: 'center',
        borderRadius: 7,
        fontSize: 14,
    },

    button: {
        backgroundColor: '#35AAFF',
        width: '45%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },

    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },

    creditsText: {
        backgroundColor: '#191919', 
        color: 'white', 
        textAlign: 'center',
        fontSize: 12,
    }
});

export default Settings;