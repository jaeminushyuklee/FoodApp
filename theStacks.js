import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const theStack = createStackNavigator({
    Login: {
        screen: Login
    },
    Objective: {
        screen: Objective
    },
    ChooseStore: {
        screen: ChooseStore
    },
    CIChomps: {
        screen: CIChomps
    },
    CIPAR: {
        screen: CIPAR
    },
    ChooseDeliveries: {
        screen: ChooseDeliveries
    }
});
export default createAppContainer(theStack);