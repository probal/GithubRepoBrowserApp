import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import LoginScreen from './components/LoginScreen';
import OwnRepoScreen from './components/OwnRepoScreen';
import ContributedRepoScreen from './components/ContributedRepoScreen';
import LogoutComponent from './components/LogoutComponent';
import IssueListingScreen from './components/IssueListingScreen';
import IssueDetailsScreen from './components/IssueDetail'


const RepoScreen = TabNavigator({
  OwnRepositories: {
    screen: OwnRepoScreen,
    navigationOptions: {
      headerRight: <LogoutComponent />,
      headerTitle: '',
      title: 'Own Repositories'
    }
  },
  Contributions: {
    screen: ContributedRepoScreen,
    navigationOptions: {
      headerRight: <LogoutComponent />,
      headerTitle: '',
      title: 'Contributions'
    }
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
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
  },
  Issue: {
    screen: IssueListingScreen,
    navigationOptions: {
        headerRight: <LogoutComponent />,
        headerTitle: ''
    }
  },
  IssueDetail: {
    screen: IssueDetailsScreen,
    navigationOptions: {
        headerRight: <LogoutComponent />,
        headerTitle: ''
    }
  }
});

export default RootNavigator;
