import React, { Component } from 'react';

import { KeyboardAvoidingView, View, TextInput, TouchableOpacity, Text, StyleSheet, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';


export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    username: "",
    password: "",
    isLogged: false,
    defaultAnimationDialog: false,
  };

  async componentDidMount() {

    const isLogged = await AsyncStorage.getItem("@OmniStack:isLogged")
    username = await AsyncStorage.getItem("@OmniStack:username")
    this.setState({ username });
    if (isLogged == "logado") {
      this.props.navigation.navigate('App')
    }
  }

  handleInputChange = (username) => {
    this.setState({ username });
  }

  handlePasswordChange = (password) => {
    this.setState({ password });
  }

  handleLogin = async () => {
    const { username } = this.state;
    // if (username !== "Lufis") {
    //   this.setState({
    //     defaultAnimationDialog: true,
    //   });
    //   return;
    // };

    this.setState({ isLogged: true })
    if (!username.length) return;
    await AsyncStorage.setItem('@OmniStack:isLogged', 'logado');
    await AsyncStorage.setItem('@OmniStack:username', username);
    console.log(username)
    this.props.navigation.navigate('App')
  }

  handleRegister = async () => {
    this.props.navigation.navigate('Register')
  }
  render() {
    return (
      <KeyboardAvoidingView bahavior="padding" style={styles.container}>
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#4BB0EE" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={this.state.username}
            onChangeText={this.handleInputChange}
          //onSubmitEditing={this.handleLogin}
            returnKeyType="send"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
            onSubmitEditing={this.handleLogin}
            returnKeyType="send"
          />
          <View style={styles.containerButtons}>
            <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
              <View style={styles.containerButtons}>
                <MaterialIcons name="lock" size={16} color="#FFFFFF" style={styles.iconButtonText} />
                <Text style={styles.buttonText}>Entrar</ Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleRegister} style={styles.buttonSignUp}>
              <View style={styles.containerButtons}>
                <MaterialIcons name="person-add" size={16} color="#FFFFFF" style={styles.iconButtonText} />
                <Text style={styles.buttonText}>Cadastre-se!</ Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Dialog
          onDismiss={() => {
            this.setState({ defaultAnimationDialog: false });
          }}
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          dialogTitle={
            <DialogTitle
              title="Ops! Usuário incorreto :("
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="TÁ DE ZOA"
                bordered
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false });
                }}
                key="button-1"
              />
              <DialogButton
                text="BLZ"
                bordered
                onPress={() => {
                  this.setState({ defaultAnimationDialog: false });
                }}
                key="button-2"
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}
          >
          </DialogContent>
        </Dialog> */}
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  containerButtons: {
    flexDirection: 'row',
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 10,
    borderRadius: 2
  },

  iconButtonText: {
    marginRight: 5,

  },

  buttonSignUp: {
    width: '49%',
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    marginLeft: 3,
    backgroundColor: '#3CB371',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },

  button: {
    width: '49%',
    marginRight: 3,
    borderRadius: 2,
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 15,
    //fontWeight: "bold"
  }
});
