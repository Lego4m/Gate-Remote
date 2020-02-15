import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

function Settings(){
    const insets = useSafeArea();
    const [pass, setPass] = useState('');

    async function storeData(){
        try{
            await AsyncStorage.setItem('pass', pass);
            Alert.alert('Senha gravada', 'Por favor reinicie o aplicativo!');
        } catch (e) {
            console.log(e);
        }
    }
    
    return(
        <View style={{flex: 1, marginTop: insets.top, backgroundColor: '#191919', alignItems: "center", justifyContent: 'center'}}>
            <TextInput 
                style={styles.input}
                secureTextEntry={true}
                placeholder="Senha"
                value={pass}
                onChangeText={setPass}
            />

            <TouchableOpacity style={styles.botao} onPress={storeData}>
                <Text>Salvar</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        width: 200,
        height: 41,
        textAlign: 'center',
        borderRadius: 5,
    },

    botao: {
        marginTop: 15,
        backgroundColor: 'white',
        width: 140,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
    }
});

export default Settings;