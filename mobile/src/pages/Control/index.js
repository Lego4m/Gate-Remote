import React, { useState, useEffect, useCallback } from 'react';

import { useRoute } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import axios from 'axios';

import {
  Container,
  StatusBar,
  StatusText,
  GatesList,
  Gate,
  Name,
} from './styles';

export default function Control() {
  const route = useRoute();

  const [gates, setGates] = useState([]);
  const [status, setStatus] = useState({
    text: 'Esperando',
    icon: { name: 'questioncircle', color: '#808080' },
  });

  function changeStatus(code) {
    function change(text, icon, color) {
      setStatus({ text, icon: { name: icon, color } });
    }

    switch (code) {
      case 144:
        change('Esperando', 'questioncircle', '#808080');
        break;
      case 204:
        change('Sinal enviado', 'checkcircle', '#04ff00');
        break;
      case 401:
        change('Senha incorreta', 'closecircle', '#ff0000');
        break;
      case 404:
        change('Portão inexistente', 'exclamationcircle', '#ff4d00');
        break;
      default:
        change('Erro', 'closecircle', '#ff0000');
    }
  }

  const retrieveGates = useCallback(async () => {
    const { address, password } = route.params.control;

    try {
      const response = await axios.get(`http://${address}/gate`, {
        headers: {
          authorization: password,
        },
      });

      setGates(response.data);
    } catch (e) {
      if (e.response) {
        changeStatus(e.response.status);
      } else {
        changeStatus();
      }
    }
  }, [route]);

  async function gateSignal(gate) {
    const { address, password } = route.params.control;

    changeStatus(144);

    try {
      const response = await axios.post(`http://${address}/gate`, '', {
        headers: {
          authorization: password,
        },
        params: {
          gate,
        },
      });

      changeStatus(response.status);
    } catch (e) {
      if (e.response) {
        changeStatus(e.response.status);
      } else {
        changeStatus();
      }
    }
  }

  useEffect(() => {
    retrieveGates();
  }, [retrieveGates]);

  return (
    <Container>
      <StatusBar>
        <StatusText>{status.text}</StatusText>

        <AntDesign
          name={status.icon.name}
          color={status.icon.color}
          size={16}
        />
      </StatusBar>

      <GatesList
        data={gates}
        keyExtractor={(gate) => String(gate.id)}
        renderItem={({ item: gate }) => (
          <Gate onPress={() => gateSignal(gate.id)}>
            <Name>{gate.name}</Name>
          </Gate>
        )}
      />
    </Container>
  );
}
