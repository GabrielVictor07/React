import react, { Component } from 'react';
import {View, Text, Image} from 'react-native';

/* Hello Word, Styles
class App extends Component{
  render(){
    const info = 'Site de Gabriel Motta';
    return(
      <View>
          <Text style={{color: 'red', fontSize: 18, padding: 20, backgroundColor: 'White', marginTop: 30, textAlign: 'center'}}>
            Hello Word!
          </Text>
          <Image
          // colocar imagem no react, colocar(uri: 'IMAGEM---') 
          source={{uri: ""}}/>
          <Text style={{color: 'white', backgroundColor: 'red', borderRadius: 20, textAlign: 'center', padding: 20, fontSize: 20, width: 300, margin: 'auto',}}>
            {info}
          </Text>
          
      </View>
    )
  }
}

export default App;
*/

/* funcion
// funcion para renderizar um texto dentro do view
function app(){
  return (
    <View>
      <Text>
          Olá React Native!
      </Text>
      <p>Brasil</p>
    </View>
  );
}
export default app;
*/

type Props = {
  largura: number;
  altura: number;
}

class App extends Component {
  render (){
    return (
      // chamando componente Uninassau e atribuindo novas props

      <View>
        <Text style={{color: 'white'}}>
          Olá Galera!
        </Text>

        <Filme largura={300} altura={300}/>
      </View>
    )
  }
}

export default App;

class Filme extends Component <Props>{
  // criando o proprio componente

  render(){
    // declarando variavel para imagem
    const img = 'https://en.wikipedia.org/wiki/File:2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg'
    // O que vai Retornar
    return(
      <Image // colocando img 
        source={{uri: img}} // obrigatorio colocar largura e altura
        style={{width: this.props.largura, height: this.props.altura}}
      />
    );
  }
}