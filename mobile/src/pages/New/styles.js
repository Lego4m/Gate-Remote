import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Content = styled.View`
  flex: 1;
  padding: 0 20px 20px;
  justify-content: space-between;
`;

export const Inputs = styled.ScrollView``;

export const InputBlock = styled.View`
  margin: 10px 0;
`;

export const Label = styled.Text`
  color: #999;
`;

export const Input = styled.TextInput`
  height: 42px;
  padding: 5px 15px;
  margin-top: 10px;

  border: 1px solid #4d4d4d;
  border-radius: 6px;
  color: #fff;
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const Button = styled(RectButton)`
  flex: 1;
  height: 42px;
  margin: 0 5px;

  background: #333;
  border-radius: 6px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
`;
