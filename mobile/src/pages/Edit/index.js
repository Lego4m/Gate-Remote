import React, { useState } from 'react';

import { TouchableOpacity, Alert } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import AsyncStorage from '@react-native-community/async-storage';

import { Header, HeaderTitle } from '../../Components/Header';

import {
  Container,
  Content,
  Inputs,
  Label,
  Input,
  Buttons,
  Button,
  ButtonText,
} from './styles';

export default function Edit() {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState(route.params.control.name);
  const [address, setAddress] = useState(route.params.control.address);
  const [password, setPassword] = useState(route.params.control.password);

  async function handleDeleteControl() {
    const { id } = route.params.control;

    const gates = JSON.parse(await AsyncStorage.getItem('controls'));

    await AsyncStorage.setItem(
      'controls',
      JSON.stringify(gates.filter((gate) => gate.id !== id))
    );

    navigation.navigate('Home');
  }

  async function handleSaveControl() {
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

    const { id } = route.params.control;

    const gates = JSON.parse(await AsyncStorage.getItem('controls'));

    await AsyncStorage.setItem(
      'controls',
      JSON.stringify(
        gates.map((gate) => {
          return gate.id === id ? { id, name, address, password } : gate;
        })
      )
    );

    navigation.navigate('Home');
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>Editar controle</HeaderTitle>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Feather name="x" color="#fff" size={32} />
        </TouchableOpacity>
      </Header>

      <Content>
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

          <Button onPress={handleDeleteControl}>
            <ButtonText>Excluir</ButtonText>
          </Button>

          <Button onPress={handleSaveControl}>
            <ButtonText>Salvar</ButtonText>
          </Button>
        </Buttons>
      </Content>
    </Container>
  );
}
