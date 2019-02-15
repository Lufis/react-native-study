import React, { Component } from 'react';
import {
    SafeAreaView, KeyboardAvoidingView,
    View, TextInput,
    TouchableOpacity, Text,
    StyleSheet, AsyncStorage
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class RegisterPage extends Component {
    static navigationOptions = {
        header: null
    };

    goBack = () => {
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
            <KeyboardAvoidingView bahavior="padding" style={styles.container}>

                <SafeAreaView>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={this.goBack}>
                            <MaterialIcons name="arrow-back" size={24} color="#4BB0EE" />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                <View style={styles.content}>
                    <View>
                        <MaterialIcons name="person" size={64} color="#4BB0EE" />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        returnKeyType="send"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Usuário"
                        returnKeyType="send"
                    />
                    <TextInput
                        secureTextEntry
                        style={styles.input}
                        placeholder="Senha"
                        returnKeyType="send"
                    />
                    <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
                        <View style={styles.containerButtons}>
                            <MaterialIcons name="person-add" size={20} color="#FFFFFF" style={styles.iconButtonText} />
                            <Text style={styles.buttonText}>Cadastrar</ Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },

    header: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
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

    button: {
        borderRadius: 2,
        height: 44,
        alignSelf: "stretch",
        marginTop: 10,
        backgroundColor: "#3CB371",
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontSize: 17,
        //fontWeight: "bold"
    }
});
