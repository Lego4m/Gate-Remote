import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import Home from './pages/Home/index';
import Settings from './pages/Settings/index';

const Routes = createAppContainer(
    createBottomTabNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="home" size={35} color={tintColor}/>
                )
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="setting" size={35} color={tintColor}/>
                )
            }
        },
    }, {
        tabBarOptions: {
            keyboardHidesTabBar: false,
            activeTintColor: 'white',
            showLabel: false,
            showIcon: true,
            style: {
                backgroundColor: '#191919',
                borderTopWidth: 0,
            },
        },
    })
);

export default Routes;