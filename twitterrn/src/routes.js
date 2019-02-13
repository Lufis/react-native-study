import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import { YellowBox } from 'react-native';
import Login from './pages/Login';
import Timeline from './pages/Timeline';
import New from './pages/New';
import Register from './pages/Register'

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);
YellowBox.ignoreWarnings(["WebView"]);

const Routes = createAppContainer(
    createSwitchNavigator({
        Login: createStackNavigator({
            Login,
            Register,
        }),
            App: createStackNavigator({
                Timeline,
                New
            }),

       

    })
);

export default Routes;