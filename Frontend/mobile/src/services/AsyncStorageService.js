import { AsyncStorage } from 'react-native';
import { TinyEmitter } from 'tiny-emitter';

const emitter = new TinyEmitter();

async function storeInAsyncStorage(type, content){
    try {
        await AsyncStorage.setItem(type, content);
        emitter.emit(type);
    } catch (e) {
        console.log(e);
    }
}

async function getFromAsyncStorage(type){
    try {
        return await AsyncStorage.getItem(type);
    } catch (e) {
        console.log(e);
    }
}

export {
    storeInAsyncStorage,
    getFromAsyncStorage,
    emitter,
}