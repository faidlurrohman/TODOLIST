import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {login} from '../css/Styles';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loadingLoading: false,
      errorChecking: false,
    };
  }

  _loadCheck = () => {
    this.setState({
      errorChecking: false,
    });
  };

  handleEmail = value => {
    this.setState({
      email: value,
    });
  };

  handlePassword = value => {
    this.setState({
      password: value,
    });
  };

  _login = async () => {
    const {email, password} = this.state;
    this.setState({loadingLoading: true});
    if (email === '' || password === '') {
      this.setState({
        errorChecking: true,
      });
      ToastAndroid.show(
        'Email or password field cannot be empty!',
        ToastAndroid.SHORT,
      );
      this.setState({loadingLoading: false});
    } else {
      try {
        const _procLogin = await axios({
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          url: 'https://aneh-sekalian.herokuapp.com/api/v1/users/',
          data: JSON.stringify({
            email,
            password,
          }),
        });
        if (_procLogin.data.status === true) {
          await AsyncStorage.setItem(
            '@token',
            JSON.stringify(_procLogin.data.data),
          );
          this.setState({loadingLoading: false});
          this.props.navigation.navigate('AuthLoading');
        }
      } catch (e) {
        this.setState({loadingLoading: false, errorChecking: true});
        ToastAndroid.show('Email or password is wrong!', ToastAndroid.SHORT);
      }
    }
  };

  render() {
    return (
      <View style={login.container}>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={login.containerTitle}>
            <Text style={login.header}>Login</Text>
            <Text style={login.headerChild}>
              Hello there, please login to continue!
            </Text>
          </View>
          <View style={login.containerForm}>
            <View style={login.containerFormControl}>
              <View style={{marginTop: 10}}>
                <Text
                  style={{
                    color: '#02116d',
                    opacity: 0.5,
                    paddingHorizontal: 5,
                  }}>
                  Email
                </Text>
                <TextInput
                  style={
                    this.state.errorChecking === true
                      ? login.inputError
                      : login.input
                  }
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  selectionColor="#375CBA"
                  placeholder="Enter your email"
                  onChangeText={value => this.handleEmail(value)}
                />
                <Text
                  style={{
                    color: '#02116d',
                    opacity: 0.5,
                    paddingHorizontal: 5,
                  }}>
                  Password
                </Text>
                <TextInput
                  style={
                    this.state.errorChecking === true
                      ? login.inputError
                      : login.input
                  }
                  placeholder="Enter your password"
                  underlineColorAndroid="transparent"
                  secureTextEntry
                  selectionColor="#375CBA"
                  autoCapitalize="none"
                  onChangeText={value => this.handlePassword(value)}
                />
              </View>
              <View style={{flex: 0, marginTop: 15}}>
                <TouchableOpacity style={login.btn1} onPress={this._login}>
                  {this.state.loadingLoading === true ? (
                    <ActivityIndicator color="#FBFBFC" size={25} />
                  ) : (
                    <Text style={login.textBtn1}>Login</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 20,
            }}>
            <Text
              style={{
                color: '#02116d',
                opacity: 0.5,
              }}>
              Don't have an account?
            </Text>
            <Text
              style={{color: '#375CBA'}}
              onPress={() => this.props.navigation.navigate('Signup')}>
              {' '}
              Sign up!
            </Text>
          </View>
        </ScrollView>
        <NavigationEvents onDidFocus={() => this._loadCheck()} />
      </View>
    );
  }
}
