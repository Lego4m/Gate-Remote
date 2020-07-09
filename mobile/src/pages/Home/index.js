import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Feather, AntDesign } from '@expo/vector-icons';

import { Container, Header, Title, GatesList, Gate, Name } from './styles';

export default function Home() {
  const [gates] = useState([]);

  return (
    <Container>
      <Header>
        <Title>Gate Remote</Title>

        <TouchableOpacity activeOpacity={0.8}>
          <Feather name="plus" color="#fff" size={32} />
        </TouchableOpacity>
      </Header>

      <GatesList
        data={gates}
        keyExtractor={(gate) => String(gate.id)}
        renderItem={({ item: gate }) => (
          <Gate onPress={() => {}}>
            <AntDesign name="home" color="#fff" size={36} />

            <Name numberOfLines={1}>{gate.name}</Name>
          </Gate>
        )}
      />
    </Container>
  );
}
