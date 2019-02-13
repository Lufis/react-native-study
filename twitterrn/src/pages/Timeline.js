import React, { Component } from 'react';
import api from '../services/api';
import { View, FlatList, StyleSheet, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import Tweet from '../components/Tweet'
import Icon from 'react-native-vector-icons/MaterialIcons';
import socket from 'socket.io-client';

export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {
      fontFamily: "Montserrat-Regular",
      fontSize: 16,
      fontWeight: "normal",
      textAlign: "center",
      //marginLeft: 200,
      flex: 1,
      width: "35%"
    },
    title: 'Início',

    headerLeft: (
      <View style={{ marginLeft: 10 }}>
        <Button
          title="Sair"
          onPress={async () => {
            await AsyncStorage.setItem('@OmniStack:isLogged', 'deslogado');
            navigation.navigate('Login');
          }} />
      </View>
    ),

    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon style={{ marginRight: 10 }} name="add-circle-outline" size={24} color="#4BB0EE" />
      </TouchableOpacity>
    )
  });

  state = {
    tweets: [],
    refreshing: false
  };
  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('tweets');
    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {

    const io = socket('http://192.168.1.124:3000')

    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] })
    })

    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      })
    })
  };

  handleRefresh = async () => {
    this.setState({ refreshing: true });
    const response = await api.get('tweets');
    this.setState({
      tweets: response.data,
      refreshing: false
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
},
);

