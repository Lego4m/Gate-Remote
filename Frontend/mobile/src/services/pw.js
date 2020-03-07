import { AsyncStorage } from 'react-native';
import { TinyEmitter } from 'tiny-emitter';

const emitter = new TinyEmitter();

async function storePasswordInAsyncStorage(localPass){
    await AsyncStorage.setItem('pass', localPass);
    emitter.emit('newPass');
}

async function getPasswordFromAsyncStorage(){
    return await AsyncStorage.getItem('pass');
}

export {
    storePasswordInAsyncStorage,
    getPasswordFromAsyncStorage,
    emitter,
}