import React, { Component } from 'react';
import api from '../services/api';
import { View, FlatList, StyleSheet, TouchableOpacity, AsyncStorage, Button } from 'react-native';
import Tweet from '../components/Tweet'
import Icon from 'react-native-vector-icons/Ionicons';
import socket from 'socket.io-client';

export default class TimelinePage extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitleStyle: {
      fontFamily: "sans-serif-light",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "left",
      flex: 1,
      color: "#4BB0EE"
    },
    headerTitle: "Timeline"
  //  headerLeft: (
  //     <View style={{ marginLeft: 10 }}>
  //       <Button
  //         title="Sair"
  //          onPress={async () => {
  //           await AsyncStorage.setItem('@OmniStack:isLogged', 'false');
  //           navigation.navigate('Login');
  //         }} />
  //     </View>
  //   )
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
    const io = socket('https://twitter-chat.herokuapp.com/')

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

        <TouchableOpacity
          onPress={() => { this.props.navigation.navigate('NewTweet') }}
          style={[styles.floatButton, styles.newTweetButton]}>
          <Icon
            color="#FFF"
            name="md-add"
            size={35}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  floatButton: {
    flex: 1,
    borderRadius: 30,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    width: 50,
    height: 50,
  },
  newTweetButton: {
    bottom: 10,
    backgroundColor: '#4BB0EE',
  },
});