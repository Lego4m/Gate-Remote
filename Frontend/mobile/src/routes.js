import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Home from './pages/Home';
import Settings from './pages/Settings';

export default function Routes(){
    return(
        <NavigationContainer>
            <Tab.Navigator 
                tabBarOptions={{
                    activeTintColor: "#FFF",
                    showLabel: false,
                    showIcon: true,
                    style: {
                        backgroundColor: "#191919",
                        borderTopWidth: 0,
                    }
                }}
            >

                <Tab.Screen 
                    name="Home" 
                    component={Home} 
                    options={{ 
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="home" size={35} color={color} />
                        )
                    }}
                />

                <Tab.Screen 
                    name="Settings" 
                    component={Settings} 
                    options={{ 
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="setting" size={35} color={color} />
                        )
                    }}
                />

            </Tab.Navigator>
        </NavigationContainer>
    )
}
