import React, { useState } from 'react';

import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Inputs,
  Label,
  Input,
  Buttons,
  Button,
  ButtonText,
} from './styles';

export default function New() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  async function handleCreateControl() {
    if (name.length < 3) {
      Alert.alert('Erro!', 'O nome deve ter no mínimo 3 caracteres.');
      return;
    }

    if (address.length < 1) {
      Alert.alert('Erro!', 'O endereço precisa ser prenchido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro!', 'A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    const id = Number((await AsyncStorage.getItem('id')) || '0') + 1;

    const controls = JSON.parse(await AsyncStorage.getItem('controls')) || [];

    controls.push({ id, name, address, password });

    await AsyncStorage.setItem('id', String(id));
    await AsyncStorage.setItem('controls', JSON.stringify(controls));

    navigation.navigate('Home');
  }

  return (
    <Container>
      <Inputs>
        <Label>Nome do controle</Label>
        <Input
          placeholder="Insira o nome"
          maxLength={30}
          value={name}
          onChangeText={setName}
        />

        <Label>Endereço</Label>
        <Input
          placeholder="Insira o endereço"
          keyboardType="numeric"
          value={address}
          onChangeText={setAddress}
        />

        <Label>Senha</Label>
        <Input
          secureTextEntry
          placeholder="Insira a senha"
          value={password}
          onChangeText={setPassword}
        />
      </Inputs>

      <Buttons>
        <Button onPress={() => navigation.goBack()}>
          <ButtonText>Cancelar</ButtonText>
        </Button>

        <Button onPress={handleCreateControl}>
          <ButtonText>Salvar</ButtonText>
        </Button>
      </Buttons>
    </Container>
  );
}
