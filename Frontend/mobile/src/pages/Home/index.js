import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Vibration } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSafeArea } from 'react-native-safe-area-context';
import { getFromAsyncStorage, emitter } from '../../services/AsyncStorageService';
import axios from '../../services/axios';
import styles from "./styles";


function Home(){
    const insets = useSafeArea();
    const [statusText, setStatusText] = useState('Esperando');
    const [statusBall, setStatusBall] = useState({icon: "questioncircle", color: "#808080"})
    const [gates, setGates] = useState([]);
    const [pass, setPass] = useState('');
    
    emitter.on('pass', retrievePass);

    useEffect(()=> {
        loadGates();
        retrievePass();
    }, []);

    async function loadGates(){
        try{
            const response = await axios.get('/gate');
            setGates(response.data);
        } catch {
            changeStatus(408);
        }
    }

    async function retrievePass() {
        setPass(await getFromAsyncStorage('pass'));
    }

    async function gateSignal(gate) {
        changeStatus(144);

        try{
            const response = await axios.post('/gate', "", {
                params: {
                    gate, 
                    pw: pass
                }
            });

            changeStatus(response.data);
        } catch (e) {
            if (e.message === "Network Error"){
                changeStatus(408);
            } else {
                changeStatus(e.response.data);
            }
        }
        
    }

    function changeStatus(code){
        if (code == 0){
            setStatusText("Senha incorreta");
            setStatusBall({icon: "closecircle", color: "#ff0000"});
        } else if (code == 1){
            setStatusText("Portão inexistente");
            setStatusBall({icon: "exclamationcircle", color: "#ff4d00"});
        } else if (code == 2){
            setStatusText("Sinal enviado");
            setStatusBall({icon: "checkcircle", color: "#04ff00"});
        } else if (code == 144){
            setStatusText("Esperando");
            setStatusBall({icon: "questioncircle", color: "#808080"});
        } else if (code == 408){
            setStatusText("Tempo esgotado");
            setStatusBall({icon: "closecircle", color: "#ff0000"});
        } else {
            setStatusText("Erro");
            setStatusBall({icon: "closecircle", color: "#ff0000"});
        }
    }
    
    return(
        <View style={{flex: 1, paddingTop: insets.top, backgroundColor: '#191919'}}>
            <View style={styles.statusBar}>
                <Text style={styles.statusText}>
                    {statusText} <Icon name={statusBall.icon} size={15} color={statusBall.color}/>
                </Text>
            </View>

            <View style={styles.controllers}>
                <FlatList
                    data={gates}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={ ({ item }) => (
                        <TouchableOpacity 
                            style={styles.gateItem} 
                            onPress={() => {
                                Vibration.vibrate(50);
                                gateSignal(item.id); 
                            }}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.gateItemText}>{item.name}</Text>
                        </TouchableOpacity>
                    ) }
                />
            </View>

        </View>
    );
}

export default Home;