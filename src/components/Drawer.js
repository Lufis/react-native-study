import React, { Component } from 'react';
import { SafeAreaView, View, Button, AsyncStorage, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DrawerItems } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class Drawer extends Component {
    state = {
        username: ''
    }

    componentDidMount = () => {
        this.getUser();
    }

    getUser = async () => {
        this.setState({ username: await AsyncStorage.getItem('@OmniStack:username') });
    }

    render() {
        const { props } = this.props

        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <LinearGradient colors={['#4BB0EE', '#4c669f', '#3b5998']} style={styles.linearGradient}>
                        <View style={styles.userInfo}>
                            <TouchableOpacity style={styles.userAvatar}>
                                <MaterialIcons name="person" color="#c9c9c9" size={50} />
                            </TouchableOpacity>
                            <Text style={styles.userID}>{this.state.username}</Text>
                            <Text style={styles.userName}>Érico Júnior</Text>
                        </View>
                    </LinearGradient>

                    <DrawerItems {...props} />

                    <TouchableOpacity onPress={async () => {
                        await AsyncStorage.setItem('@OmniStack:isLogged', 'false');
                        props.navigation.navigate('Login')
                    }} >
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>Logout</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>)
            ;
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        height: "40%"
    },
    userInfo: {
        position: 'absolute',
        bottom: 10,
        marginLeft: 20,
    },
    userAvatar: {
        backgroundColor: "#f4f4f4",
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    userID: {
        color: "#FFF"
    },
    userName: {
        marginTop: 5,
        color: "#c9c9c9"
    },
    logoutButton: {
        backgroundColor: '#4BB0EE',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10
    }
});
