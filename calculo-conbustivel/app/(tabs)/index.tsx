import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';

const TextInputExample = () => {
  const [nEtanol, onEtanol] = React.useState('');
  const [nGasolina, onGasolina] = React.useState('');
  const [resultado, setResultado] = useState('');

  const calcularMelhorOpcao = () => {
    const etanol = parseFloat(nEtanol.replace(',', '.'));
    const gasolina = parseFloat(nGasolina.replace(',', '.'));

    const proporcao = etanol / gasolina;

    if (isNaN(etanol) || isNaN(gasolina)) {
      Alert.alert('Erro', 'Digite digite valores corretos.');
      return;
    }

    if (proporcao < 0.7) {
      setResultado('Melhor abastecer com Etanol/Alcool 🚗💨');
      alert(resultado)
    } else {
      setResultado('Melhor abastecer com Gasolina ⛽');
      alert(resultado)
    }
  };

  return (
    
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.View}>
          <Text style={{fontSize: 40, color: '#ffc632', fontWeight: 'bold', marginBottom: 20}}>Digite os Valores</Text>
          <Text style={{textAlign: 'center', fontSize: 30, color: 'white', fontWeight: 'normal', marginTop: 20 }}>Etanol</Text>
          <TextInput
            style={styles.input}
            onChangeText={onEtanol}
            placeholder='Preço do Etanol'
            value={nEtanol}
            keyboardType="numeric"
          />
          <Text style={{textAlign: 'center', fontSize: 30, color: 'white', fontWeight: 'normal', marginTop: 20 }}>Gasolina</Text>
          <TextInput
            style={styles.input}
            onChangeText={onGasolina}
            value={nGasolina}
            placeholder="Preço da Gasolina"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.button} onPress={calcularMelhorOpcao}>
            <Text style={{ color: 'black', backgroundColor: 'white', padding: 10, borderRadius: 10, fontWeight: 'bold' }}>
              CALCULAR
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'white',
    backgroundColor: '#005f3f',
    borderRadius: 5,
    outline: 'none',
    borderColor: 'transparent',
    boxShadow: "0px 0px 1px black",
    width: 300,
    fontWeight: 'bold'
  },
  View: {
    backgroundColor: '#007f3f',
    height: 1000,
    alignItems: "center",
    justifyContent: 'center'
  },
  button: {
    textAlign: 'center',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultado: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  }
});

export default TextInputExample;