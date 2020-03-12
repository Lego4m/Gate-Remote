import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useSafeArea } from 'react-native-safe-area-context';
import { getFromAsyncStorage, emitter } from '../services/AsyncStorageService';
import axios from '../services/axios';

function Home(){
    const insets = useSafeArea();
    const [statusText, setStatusText] = useState('Esperando');
    const [statusBall, setStatusBall] = useState({icon: "questioncircle", color: "gray"})
    const [gates, setGates] = useState([]);
    const [pass, setPass] = useState('');
    
    emitter.on('pass', retrievePass);

    useEffect(()=> {
        loadGates();
        retrievePass();
    }, []);

    async function loadGates(){
        try{
            const response = await axios.get(`/gateInfos`);
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
            const response = await axios.post(`/gate?gate=${gate}&&pw=${pass}`);
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
            setStatusBall({icon: "closecircle", color: "red"});
        } else if (code == 1){
            setStatusText("Portão inexistente");
            setStatusBall({icon: "exclamationcircle", color: "orangered"});
        } else if (code == 2){
            setStatusText("Sinal enviado");
            setStatusBall({icon: "checkcircle", color: "green"});
        } else if (code == 144){
            setStatusText("Esperando");
            setStatusBall({icon: "questioncircle", color: "gray"});
        } else if (code == 408){
            setStatusText("Tempo esgotado");
            setStatusBall({icon: "closecircle", color: "red"});
        } else {
            setStatusText("Erro");
            setStatusBall({icon: "closecircle", color: "red"});
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
                    keyExtractor={(item, index) => index}
                    numColumns={2}
                    renderItem={ ({ item, index }) => (
                        <TouchableOpacity style={styles.gateItem} onPress={() => {gateSignal(index + 1)}}>
                            <Text style={styles.gateItemText}>{item}</Text>
                        </TouchableOpacity>
                    ) }
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    statusBar: {
        width: "100%",
        backgroundColor: "#3c3c3c",
    },

    statusText: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    },

    controllers: {
        maxWidth: 1200,
        margin: "auto",
        paddingTop: 8,
        paddingBottom: 20,

        alignItems: "center",
    },

    gateItem: {
        height: 130,
        width: 130,
        margin: 14,

        backgroundColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: "center",
    },

    gateItemText: {
        fontSize: 18,
        color: "white",
    }

});

export default Home;