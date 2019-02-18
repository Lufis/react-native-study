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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Drawer from './components/Drawer';

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
                headerTitleStyle: {
                    fontFamily: "sans-serif-light",
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "left",
                    flex: 1,
                    color: "#4BB0EE"
                },
                headerLeft: (
                    <MaterialIcon
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
        screen: timelineStackNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (<MaterialIcon name="home" color={tintColor} size={25}/>)
        }
    }
}, {
        contentComponent: (props) => (
            <Drawer props={props} />
        )

    });

//App
const appSwitchNavigator = createSwitchNavigator({
    Login: { screen: loginStackNavigator },
    Home: { screen: homePageDrawerNavigator }
});

//Main
const Routes = createAppContainer(appSwitchNavigator);

export default Routes;