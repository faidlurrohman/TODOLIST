import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Complete from './pages/Complete';
import Favorite from './pages/Favorite';
import Drawer from './pages/Drawer';

const AppNavigator = createStackNavigator({
  Landing: {
    screen: Landing,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerTitle: '',
      headerStyle: {
        elevation: 0,
        backgroundColor: '#375CBA',
      },
      headerTintColor: '#FBFBFC',
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      headerTitle: '',
      headerStyle: {
        elevation: 0,
        backgroundColor: '#375CBA',
      },
      headerTintColor: '#FBFBFC',
    },
  },
});

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadToken();
  }

  _loadToken = async () => {
    await AsyncStorage.getItem('@token', (error, response) => {
      if (response) {
        this.props.navigation.navigate('Auth');
      } else {
        this.props.navigation.navigate('App');
      }
    });
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator
          size={50}
          color="#375CBA"
          style={{opacity: 0.7}}></ActivityIndicator>
      </View>
    );
  }
}

const HomeNavigator = createStackNavigator(
  {
    Home: Home,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerStyle: {
          backgroundColor: '#375CBA',
          elevation: 0,
        },
        headerTitle: '',
        headerLeft: () => (
          <Entypo
            name="list"
            size={30}
            style={{paddingLeft: 15, color: '#FBFBFC', flex: 0}}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => <View />,
      };
    },
  },
);

const CompleteNavigator = createStackNavigator(
  {
    Complete: Complete,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerStyle: {
          backgroundColor: '#B51B22',
          elevation: 0,
        },
        headerTitle: '',
        headerLeft: () => (
          <Entypo
            name="list"
            size={30}
            style={{paddingLeft: 15, color: '#FBFBFC'}}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => <View />,
      };
    },
  },
);

const FavoriteNavigator = createStackNavigator(
  {
    Favorite: Favorite,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerStyle: {
          backgroundColor: '#F79237',
          elevation: 0,
        },
        headerTitle: '',
        headerLeft: () => (
          <Entypo
            name="list"
            size={30}
            style={{paddingLeft: 15, color: '#FBFBFC'}}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => <View />,
      };
    },
  },
);

const HomeStack = createDrawerNavigator(
  {
    Home: HomeNavigator,
    Complete: CompleteNavigator,
    Favorite: FavoriteNavigator,
  },
  {
    contentComponent: props => <Drawer {...props} />,
    drawerType: 'back',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: HomeStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
