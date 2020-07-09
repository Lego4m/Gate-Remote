import styled from 'styled-components/native';

import Constants from 'expo-constants';

export const Container = styled.View`
  flex: 1;
  background: #000000;
  padding-top: ${Constants.statusBarHeight}px;
`;

export const Header = styled.View`
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom-color: #4d4d4d;
  border-bottom-width: 1px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const GatesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Gate = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  border-bottom-color: #4d4d4d;
  border-bottom-width: 1px;
  padding: 25px 20px;

  flex-direction: row;
  align-items: center;
`;

export const Name = styled.Text`
  font-size: 16px;
  color: #fff;
  margin: 0 35px 0 15px;
`;
