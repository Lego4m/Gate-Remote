import styled from 'styled-components/native';

import Constants from 'expo-constants';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #000000;
  padding-top: ${Constants.statusBarHeight}px;
`;

export const StatusBar = styled.View`
  background: #333;
  padding: 2px 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const StatusText = styled.Text`
  margin-right: 5px;
  color: #fff;
`;

export const GatesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
  contentContainerStyle: {
    paddingTop: 20,
    alignItems: 'center',
  },
})``;

export const Gate = styled(RectButton)`
  height: 120px;
  width: 120px;
  padding: 5px;

  background: #333;
  border-radius: 8px;
  margin: 20px;

  display: flex;
  justify-content: center;
`;

export const Name = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #fff;
`;
