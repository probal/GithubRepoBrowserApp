import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import LoginScreen from './components/LoginScreen';
import MyRepoScreen from './components/MyRepoScreen';
import ContributedRepoScreen from './components/ContributedRepoScreen';

const RepoScreen = TabNavigator({
  OwnRepo: {
    screen: MyRepoScreen,
    navigationOptions: {
      headerTitle: 'My Repos',
    },
  },
  Contributions: {
    screen: ContributedRepoScreen,
    navigationOptions: {
      headerTitle: 'My Contributions',
    },
  },
});

const RootNavigator = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerTitle: 'Login with Github',
    },
  },
  Repo: {
    screen: RepoScreen
  }
});

export default RootNavigator;
