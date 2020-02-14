import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from './pages/Home';
import Settings from './pages/Settings';

const Routes = createAppContainer(
    createBottomTabNavigator({
        Home,
        Settings,
    }, {
        tabBarOptions: {
            style: {
                backgroundColor: 'black',
            },
            labelStyle: {
                fontSize: 16
            },
            activeTintColor: 'white',
        },
    })
);

export default Routes;