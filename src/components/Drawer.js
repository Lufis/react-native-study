import React, { Component } from 'react';
import {
    SafeAreaView, View,
    ScrollView, Button,
    AsyncStorage, Text,
    StyleSheet, TouchableOpacity,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { DrawerItems } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
                <ScrollView contentContainerStyle={{  }}>

                    <LinearGradient colors={['#4BB0EE', '#4c669f', '#3b5998']} style={styles.linearGradient}>
                        <View style={styles.userInfo}>
                            <TouchableOpacity style={styles.userAvatar}>
                                <MaterialIcon name="person" color="#c9c9c9" size={50} />
                            </TouchableOpacity>
                            <Text style={styles.userID}>{this.state.username}</Text>
                            <Text style={styles.userName}>Fulano de Tal</Text>
                        </View>
                    </LinearGradient>

                    <DrawerItems {...props} />

                </ScrollView >

                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={
                        async () => {
                            await AsyncStorage.setItem('@OmniStack:isLogged', 'false');
                            props.navigation.navigate('Login')
                        }} style={styles.item}>
                        <MaterialIcon name="exit-to-app" size={25} style={styles.itemIcon} />
                        <Text style={styles.itemLabel}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        height: Dimensions.get('window').height * 0.2
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
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        marginHorizontal: 16,
        alignItems: 'center',
    },
    itemLabel: {
        color: 'black',
        fontWeight: 'bold',
        margin: 16,
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }
});
