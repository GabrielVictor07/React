import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

type State = {
  userInput: string;
  secretNumber: number;
  attempts: number;
};

class JogoDoNumero extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      userInput: '',
      secretNumber: this.generateSecretNumber(),
      attempts: 1,
    };
  }

  generateSecretNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };

  handleGuess = () => {
    const {userInput, secretNumber, attempts }  = this.state;
    const guess = parseInt(userInput);

  if (isNaN(guess)){
    Alert.alert('Erro', 'Por favor, digite um numero valido');
    return;
  }
  if (guess === secretNumber) {
    Alert.alert('Parabéns!',
        `Você acertou o número ${secretNumber} com ${attempts + 1} tentativa(s)!`
      );
      this.setState({
        userInput: '',
        secretNumber: this.generateSecretNumber(),
        attempts: 0,
      });
  } else {
    Alert.alert('Errou!', 'Tente novamente!');
    this.setState({ attempts: attempts + 1 });
  }

  // Limpa o campo
  this.setState({ userInput: '' });
  };

render() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adivinha o numero Secreto 1 a 10</Text>
      <TextInput
        style={styles.input}
        placeholder="digite seu palpite"
        value={this.state.userInput}
        onChangeText={(text) => this.setState({ userInput: text })}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={this.handleGuess}>
          <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <Text style={styles.attemptsText}>
          Tentativas: {this.state.attempts}
        </Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: 'white',
    backgroundColor: 'transparente'
  },
  btn: {
    backgroundColor: 'white',
    padding: 20,
    width: 200,
    borderRadius: 20
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 500
  },
  attemptsText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
});

export default JogoDoNumero;
