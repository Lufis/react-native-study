import React, { Component } from 'react';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
    createDrawerNavigator,
    DrawerItems
} from 'react-navigation'
import { SafeAreaView, View, Button, AsyncStorage } from 'react-native';
import LoginPage from './pages/LoginPage';
import TimelinePage from './pages/TimelinePage';
import NewTweetPage from './pages/NewTweetPage';
import RegisterPAge from './pages/RegisterPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Login page
const loginStackNavigator = createStackNavigator({
    Login: LoginPage,
    Register: RegisterPAge
});

//Timeline Page
const timelineStackNavigator = createStackNavigator({
    Timeline: TimelinePage,
    NewTweet: NewTweetPage,
},
    {
        defaultNavigationOptions: ({ navigation }) => {
            return {
                headerLeft: (
                    <MaterialIcons
                        name="menu"
                        size={30}
                        style={{ paddingLeft: 10 }}
                        onPress={() => navigation.openDrawer()}
                        color="#4BB0EE" />
                )
            }
        }
    }
);

//Home Page
const homePageDrawerNavigator = createDrawerNavigator({
    TimeLine: {
        screen: timelineStackNavigator
    }
}, {
        contentComponent: (props) => (
            <View style={{ flex: 1 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                    <Button title="Logout" onPress={async () => {
                        await AsyncStorage.setItem('@OmniStack:isLogged', 'false');
                        props.navigation.navigate('Login')
                    }} />
                </SafeAreaView>
            </View>
        ),
    });

//App
const appSwitchNavigator = createSwitchNavigator({
    Login: { screen: loginStackNavigator },
    Home: { screen: homePageDrawerNavigator }
});

//Main
const Routes = createAppContainer(appSwitchNavigator);

export default Routes;