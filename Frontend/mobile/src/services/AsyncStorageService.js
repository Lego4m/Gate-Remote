import { AsyncStorage } from 'react-native';
import { TinyEmitter } from 'tiny-emitter';

const emitter = new TinyEmitter();

async function storeInAsyncStorage(type, content){
    try {
        await AsyncStorage.setItem(type, content);
        emitter.emit(type);

        return true;
    } catch (e) {
        console.log(e);
        
        return false;
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