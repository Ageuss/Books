import React, {useState} from 'react';

import { SafeAreaView, Text, StyleSheet, View, FlatList, TextInput, Button} from 'react-native';
import api from './api';

const App = () => {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  const filter = (fieldText) => {
    if (fieldText) {
      api.get(fieldText).then((Response) => {
        for(var i = 0; i < Response.data.hits.length; i++){
          if(Response.data.hits){
            setFiltered(Response.data.hits);
          }
        }
        setSearch(fieldText);
      });
    }
  };

  const ViewItems = ({item}) => {
    return (
      <Text style={styles.items}>
        {'Author: '}
        {item.author + '\n'}
        {'Title: '}
        {item.title + '\n'}
        {'Url: '}
        {item.url}
      </Text>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Books</Text>
        <TextInput
          style={styles.inpt}
          onChangeText = {(fieldText) => setSearch(fieldText)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Buscar"
        />
        <Button
        onPress = {() => filter(search)}
        title="Buscar"
        color="green"
        />
        <FlatList
          data={filtered}
          renderItem={ViewItems}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: 'white',
  },
  text: {
    textAlign: "center",
    fontSize: '150%',
    marginBottom: '4%'
  },
  items: {
    backgroundColor: '#0066CC',
    padding: 8,
    marginTop: 8,
    color: 'white',
  },
  inpt: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
  },

});

export default App;