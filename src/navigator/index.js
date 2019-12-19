//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:14:05 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {dyanimcTitle} from './navigatorHelper';
import {Home, Demo, Create} from '../containers';

import {createStackNavigator} from 'react-navigation-stack';
import {ButtonView} from '../reuseableComponents';

import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {push} from '../services/NavigationService';

const showTitle = title => {
  return {
    navigationOptions: ({navigation}) => ({
      //   header:,
      title: title,
      headerRight: (
        <ButtonView
          onPress={() => push('create')}
          style={{paddingHorizontal: 20}}>
          <Text>Create +</Text>
        </ButtonView>
      ),
    }),
  };
};

const HomeStack = createStackNavigator({
  home: {
    screen: Home,
    ...showTitle('Home'),
  },
  demo: {
    screen: Demo,
  },
  create: {
    screen: Create,
  },
});

const rootNavigator = isUserLoggedIn =>
  createAppContainer(
    createSwitchNavigator(
      {
        HomeStack,
      },
      {
        initialRouteName: isUserLoggedIn ? 'HomeStack' : 'HomeStack',
      },
    ),
  );

export default rootNavigator;
