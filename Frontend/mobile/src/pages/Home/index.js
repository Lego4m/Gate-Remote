import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';

import defaultIp from '../../utils/defaultIp';

import axios from 'axios';

import styles from './styles';

export default function Home(){
    const [status, setStatus] = useState({
        text: "Esperando", 
        icon: { name: "questioncircle", color: "#808080" }
    });

    const [gates, setGates] = useState([]);
    const [ip, setIp] = useState('');
    const [pass, setPass] = useState('');

    const [refreshing, setRefreshing] = useState(false);

    useEffect(()=> {
        loadGates();
    }, [])

    async function loadGates(){
        try {
            const ip = await AsyncStorage.getItem('ip') || defaultIp;
            const pass = await AsyncStorage.getItem('pass');

            try{
                const response = await axios.get(`http://${ip}/gate`);

                if (response.headers["content-type"] === "application/json"){
                    setIp(ip);
                    setPass(pass);
                    setGates(response.data);
                    changeStatus(144);
                } else {
                    throw "error";
                }

            } catch {
                setGates([]);
                changeStatus(408);
            }

        } catch {
            changeStatus(120);
        }
    }

    async function gateSignal(id){
        changeStatus(144);

        try {
            const response = await axios.post(`http://${ip}/gate`, "", {
                params: {
                    gate: id
                },
                headers: {
                    authorization: pass
                }
            });

            changeStatus(response.status);
        } catch(e) {
            e.message === "Network Error" ? changeStatus(408) : changeStatus(e.response.status);
        }
    }

    async function handleRefresh(){
        setRefreshing(true);
        await loadGates();
        setRefreshing(false);
    }

    function changeStatus(code){
        if (code == 204){
            setStatus({text: "Sinal enviado", icon: {name: "checkcircle", color: "#04ff00"}});
        } else if (code == 404){
            setStatus({text: "Portão inexistente", icon: {name: "exclamationcircle", color: "#ff4d00"}});
        } else if (code == 401){
            setStatus({text: "Senha incorreta", icon: {name: "closecircle", color: "#ff0000"}});
        } else if (code == 408){
            setStatus({text: "Tempo esgotado", icon: {name: "closecircle", color: "#ff0000"}});
        } else if (code == 144){
            setStatus({text: "Esperando", icon: {name: "questioncircle", color: "#808080"}});
        } else if (code == 120){
            setStatus({text: "Erro no armazenamento", icon: {name: "closecircle", color: "#ff0000"}});
        }
    }

    return(
        <View style={styles.container} >
            <View style={styles.statusBar}>
                <Text style={styles.statusBarText}>
                    {status.text} <AntDesign name={status.icon.name} size={15} color={status.icon.color} /> 
                </Text>
            </View>

            <FlatList
                contentContainerStyle={{ alignItems: "center" }}
                data={gates}
                numColumns={2}
                keyExtractor={gate => String(gate.id)}
                renderItem={ ({ item: gate }) => (
                    <TouchableOpacity 
                        style={styles.gateItem} 
                        onPress={()=>{gateSignal(gate.id)}} 
                        activeOpacity={0.6}
                    >
                        <Text style={styles.gateItemText}>{gate.name}</Text>
                    </TouchableOpacity>
                ) }
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
        </View>
    )
}